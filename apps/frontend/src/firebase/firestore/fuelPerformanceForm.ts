import {
  addDoc,
  collection,
  getDocs,
  limit,
  orderBy,
  query,
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
  private data: FuelPerformanceForm;
  private enterpriseId?: string;

  constructor(data: FuelPerformanceForm, enterpriseId?: string) {
    this.data = data;
    this.enterpriseId = enterpriseId;
  }

  private async fetchLastFormDoc() {
    const fuelPerformanceReference = collection(
      db,
      this.enterpriseId
        ? firestoreCollections.EnterpriseForms(this.enterpriseId)
        : firestoreCollections.UserFuelsPerformance(this.data.userId)
    );
    const lastFormQuery = query(
      fuelPerformanceReference,
      where("userId", "==", this.data.userId),
      orderBy("createdAt", "desc"),
      limit(1)
    );

    // Data del último registro para la formula
    return await getDocs(lastFormQuery).then((res) => {
      if (res.docs.length === 0) return null;
      return res.docs[0].data();
    });
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

  public async addRegister(data: FuelPerformanceForm) {
    const fuelPerformance = collection(
      db,
      this.enterpriseId
        ? firestoreCollections.EnterpriseForms(this.enterpriseId)
        : firestoreCollections.UserFuelsPerformance(data.userId)
    );
    return await addDoc(fuelPerformance, await this.computeFuelForm());
  }
}
