import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  setDoc,
  Timestamp,
  where,
} from "@firebase/firestore";
import { firestoreCollections } from ".";
import { db } from "../client";
import {
  computeKmPorGalon,
  computeKmRecorrido,
  computePagoPorKm,
  computePagoTotal,
} from "./computes";
import { FuelPerformanceDoc, FuelPerformanceForm } from "./interfaces";

export default class FuelPerformance {
  constructor(
    private data: FuelPerformanceForm,
    private enterprise?: {
      id: string;
      vehicle: string;
    }
  ) {}

  private async fetchLastFormDoc() {
    const fuelPerformanceReference = collection(
      db,
      this.enterprise
        ? firestoreCollections.FuelPerformancesForEnterpriseVehicle(
            this.enterprise.id,
            this.enterprise.vehicle
          )
        : firestoreCollections.UserFuelsPerformance(this.data.userId)
    );

    const filters = [];

    if (this.enterprise === undefined)
      filters.push(where("userdId", "==", this.data.userId));
    filters.push(orderBy("createdAt", "desc"));
    filters.push(orderBy("horometro", "desc"));

    const lastFormQuery = query(fuelPerformanceReference, ...filters, limit(1));

    // Data del último registro para la formula
    const lastDoc = await getDocs(lastFormQuery).then((res) => {
      if (res.docs.length === 0) return null;
      return res.docs[0].data();
    });
    return lastDoc;
  }

  private async computeFuelForm() {
    const lastFormDoc = await this.fetchLastFormDoc();

    // Datos dinámicos por las formulas
    const kmRecorrido = computeKmRecorrido(this.data, lastFormDoc);
    const pagoTotal = computePagoTotal(
      this.data.precioPorGalon,
      this.data.galones
    );
    const pagoPorKm = computePagoPorKm(kmRecorrido, pagoTotal);
    const kmPorGalon = computeKmPorGalon(kmRecorrido, this.data.galones);

    let createdAt = new Date();

    if (process.env.NODE_ENV === "development" && (this.data as any).createdAt)
      createdAt = (this.data as any).createdAt;

    const data: FuelPerformanceDoc = {
      ...this.data,
      pagoTotal,
      kmRecorrido,
      kmPorGalon,
      pagoPorKm,
      createdAt: Timestamp.fromDate(createdAt),
    };

    return data;
  }

  public async addRegister() {
    if (this.enterprise) {
      const FPFDocRef = doc(
        db,
        firestoreCollections.EnterpriseVehicle(
          this.enterprise.id,
          this.enterprise.vehicle
        )
      );
      const existDoc = (await getDoc(FPFDocRef)).exists();
      if (!existDoc) {
        await setDoc(FPFDocRef, { placa: this.enterprise.vehicle });
      }
    }

    const fuelPerformance = collection(
      db,
      this.enterprise
        ? firestoreCollections.FuelPerformancesForEnterpriseVehicle(
            this.enterprise.id,
            this.enterprise.vehicle
          )
        : firestoreCollections.UserFuelsPerformance(this.data.userId)
    );
    return await addDoc(fuelPerformance, await this.computeFuelForm());
  }
}
