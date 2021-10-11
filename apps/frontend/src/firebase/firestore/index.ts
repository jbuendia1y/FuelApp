import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  Timestamp,
  addDoc,
  where,
  doc,
  updateDoc,
  getDoc,
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
  //For Users
  Users: "users",
  User: function (uid: string) {
    return this.Users + "/" + uid;
  },
  UserFuelsPerformance: function (uid: string) {
    return this.User(uid) + "/fuels-performance";
  },

  // For Enterprises
  Enterprises: "enterprises",
  Enterprise: function (enterpriseId: string) {
    return this.Enterprises + "/" + enterpriseId;
  },
};

export const updateUser = async (user: any) => {
  const userRef = doc(db, firestoreCollections.User(user.uid));
  return await updateDoc(userRef, user);
};

const fetchLastFormDoc = async (userId: string) => {
  const fuelPerformanceReference = collection(
    db,
    firestoreCollections.UserFuelsPerformance(userId)
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

  let createdAt = new Date();

  if (process.env.NODE_ENV === "development" && (formData as any).createdAt)
    createdAt = (formData as any).createdAt;

  const data: FuelPerformanceDoc = {
    ...formData,
    pagoTotal,
    kmRecorrido,
    kmPorGalon,
    pagoPorKm,
    createdAt: Timestamp.fromDate(createdAt),
  };

  return data;
};

export const addRegister = async (data: FuelPerformanceForm) => {
  const fuelPerformance = collection(
    db,
    firestoreCollections.UserFuelsPerformance(data.userId)
  );
  return await addDoc(fuelPerformance, await computeFuelForm(data));
};

export const fetchRegister = (id: string) => {
  return id;
};

export const fetchHistoric = async (uid: string) => {
  const fuelPerformance = collection(
    db,
    firestoreCollections.UserFuelsPerformance(uid)
  );
  const docsQuery = query(
    fuelPerformance,
    where("userId", "==", uid),
    orderBy("createdAt", "asc")
  );
  return await getDocs(docsQuery).then((res) => res.docs);
};

export const fetchEnterprises = async () => {
  const enterprisesCollection = collection(
    db,
    firestoreCollections.Enterprises
  );

  return await getDocs(query(enterprisesCollection));
};

export const fetchEnterprise = async (id: string) => {
  const enterpriseReference = doc(db, firestoreCollections.Enterprise(id));
  return getDoc(enterpriseReference);
};
