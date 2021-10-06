import {
  collection,
  getDocs,
  getFirestore,
  limit,
  orderBy,
  query,
  Timestamp,
  addDoc,
  getDoc,
  where,
  doc,
  updateDoc,
} from "@firebase/firestore";
import {
  computeKmPorGalon,
  computeKmRecorrido,
  computePagoPorKm,
  computePagoTotal,
} from "./computes";
import { FuelPerformanceDoc, FuelPerformanceForm } from "./interfaces";
import { db } from "../client";

export const firestoreCollections = {
  FuelPerformance: "fuel-performance",
  Users: "users",
};

const fetchLastFormDoc = async (userId: string) => {
  const fuelPerformanceReference = collection(
    db,
    firestoreCollections.FuelPerformance
  );
  const lastFormQuery = query(
    fuelPerformanceReference,
    where("userId", "==", userId),
    orderBy("createdAt", "desc"),
    limit(1)
  );

  // Data del último registro para la formula
  return await getDocs(lastFormQuery).then((res) => {
    if (res.docs.length === 0) return null;
    return res.docs[0].data();
  });
};

const computeFuelForm = async (formData: FuelPerformanceForm) => {
  const lastFormDoc = await fetchLastFormDoc(formData.userId);

  // Datos dinámicos por las formulas
  const kmRecorrido = computeKmRecorrido(formData, lastFormDoc);
  const pagoTotal = computePagoTotal(formData.precioPorGalon, formData.galones);
  const pagoPorKm = computePagoPorKm(kmRecorrido, pagoTotal);
  const kmPorGalon = computeKmPorGalon(kmRecorrido, formData.galones);

  const data: FuelPerformanceDoc = {
    ...formData,
    pagoTotal,
    kmRecorrido,
    kmPorGalon,
    pagoPorKm,
    createdAt: Timestamp.fromDate(new Date()),
  };

  return data;
};

export const addRegister = async (data: FuelPerformanceForm) => {
  const fuelPerformance = collection(db, firestoreCollections.FuelPerformance);
  return await addDoc(fuelPerformance, await computeFuelForm(data));
};

export const fetchRegister = (id: string) => {
  return id;
};

export const fetchHistoric = async (uid: string) => {
  const fuelPerformance = collection(db, firestoreCollections.FuelPerformance);
  const docsQuery = query(fuelPerformance, where("userId", "==", uid));
  return await getDocs(docsQuery).then((res) => res.docs);
};
