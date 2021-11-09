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
  setDoc,
  deleteDoc,
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

  // Enterprise Users By Role
  EnterpriseUsers: function (enterpriseId: string) {
    return this.Enterprise(enterpriseId) + "/users";
  },

  // Enterprise Vehicles
  EnterpriseVehicles: function (enterpriseId: string) {
    return this.Enterprise(enterpriseId) + "/vehicles";
  },

  EnterpriseVehicle: function (enterpriseId: string, placa: string) {
    return this.EnterpriseVehicles(enterpriseId) + "/" + placa;
  },

  // Requests for the Company
  EnterpriseRequests: function (enterpriseId: string) {
    return this.Enterprise(enterpriseId) + "/requests";
  },

  FuelPerformancesForEnterpriseVehicle: function (
    enterpriseId: string,
    vehicle: string
  ) {
    return this.EnterpriseVehicle(enterpriseId, vehicle) + "/fuel-performance";
  },

  // RolesInEnterprises
  UserOfEnterprise: function (enterpriseId: string, uid: string) {
    return this.EnterpriseUsers(enterpriseId) + "/" + uid;
  },
};

const getUser = async (uid: string) => {
  const userDoc = await getDoc(doc(db, firestoreCollections.User(uid)));
  if (!userDoc.exists()) return null;
  return userDoc.data();
};

export const memberOfEnterprises = async (uid: string) => {
  const user = await getUser(uid);
  if (!user) return user;

  const enterprisesData: any[] = [];
  if (user.enterprises.length === 0) return null;

  for (const enterpriseRef of user.enterprises) {
    const enterpriseDoc = await getDoc(enterpriseRef);
    enterprisesData.push({
      id: enterpriseDoc.id,
      ...(enterpriseDoc.data() as any),
    });
  }

  return enterprisesData;
};

export const fetchEnterpriseUsersByRole = (
  enterpriseId: string,
  role: "admin" | "supervisor" | "chofer"
) => {
  const enterprisesCollection = collection(
    db,
    firestoreCollections.EnterpriseUsers(enterpriseId)
  );
  const enterpriceUsersQuery = query(
    enterprisesCollection,
    where("role", "==", role),
    limit(15)
  );
  console.log(enterprisesCollection);
  return getDocs(enterpriceUsersQuery);
};

export const updateUser = async (user: any) => {
  const userRef = doc(db, firestoreCollections.User(user.uid));
  return await updateDoc(userRef, user);
};

const fetchLastFormDoc = async (
  userId: string,
  enterprise?: {
    id: string;
    vehicle: string;
  }
) => {
  const fuelPerformanceReference = collection(
    db,
    enterprise
      ? firestoreCollections.FuelPerformancesForEnterpriseVehicle(
          enterprise.id,
          enterprise.vehicle
        )
      : firestoreCollections.UserFuelsPerformance(userId)
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

export const getRoleOfUserInEnterprise = async (
  uid: string,
  enterpriseId: string
) => {
  const UserOfEnterpriseDocReference = doc(
    db,
    firestoreCollections.UserOfEnterprise(enterpriseId, uid)
  );

  const UserInEnterprise = await getDoc(UserOfEnterpriseDocReference);
  if (!UserInEnterprise.exists()) return null;
  else return UserInEnterprise.data().role;
};

const computeFuelForm = async (
  formData: FuelPerformanceForm,
  enterprise?: {
    id: string;
    vehicle: string;
  }
) => {
  const lastFormDoc = await fetchLastFormDoc(formData.userId, enterprise);

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

export const addRegister = async (
  data: FuelPerformanceForm,
  enterprise?: {
    id: string;
    vehicle: string;
  }
) => {
  const fuelPerformance = collection(
    db,
    enterprise
      ? firestoreCollections.FuelPerformancesForEnterpriseVehicle(
          enterprise.id,
          enterprise.vehicle
        )
      : firestoreCollections.UserFuelsPerformance(data.userId)
  );
  return await addDoc(fuelPerformance, await computeFuelForm(data, enterprise));
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

export const addSupervisor = async (enterpriseId: string, uid: string) => {
  const EnterpriseUsersDocRef = doc(
    db,
    firestoreCollections.UserOfEnterprise(enterpriseId, uid)
  );

  return setDoc(EnterpriseUsersDocRef, { uid, role: "supervisor" });
};

export const fetchVehicles = async (enterpriseId: string) => {
  const EnterpriseVehiclesCollRef = collection(
    db,
    firestoreCollections.EnterpriseVehicles(enterpriseId)
  );

  const EnterpriseVehiclesCollRefQuery = query(
    EnterpriseVehiclesCollRef,
    limit(15)
  );

  return await getDocs(EnterpriseVehiclesCollRefQuery);
};

export const addVehicle = (enterpriseId: string, data: any) => {
  const EnterpriseVehiclesCollRef = collection(
    db,
    firestoreCollections.EnterpriseVehicles(enterpriseId)
  );

  return addDoc(EnterpriseVehiclesCollRef, data);
};

export const fetchRequests = (enterpriseId: string) => {
  const EnterpriseRequestsCollRef = collection(
    db,
    firestoreCollections.EnterpriseRequests(enterpriseId)
  );
  const EnterpriseRequestsQuery = query(EnterpriseRequestsCollRef, limit(15));
  return getDocs(EnterpriseRequestsQuery);
};

export const requestAccess = async (enterpriseId: string, data: any) => {
  const EnterpriseRequestDocRef = doc(
    db,
    firestoreCollections.EnterpriseRequests(enterpriseId) + "/" + data.uid
  );

  const existRequest = await getDoc(EnterpriseRequestDocRef);
  if (existRequest.exists())
    throw new Error(
      "Usted ya solicitó el acceso.\n Espere a que los supervisores de la empresa revisen su solicitud"
    );

  await setDoc(
    doc(db, firestoreCollections.User(data.uid)),
    {
      enterprises: [doc(db, firestoreCollections.Enterprise(enterpriseId))],
    },
    { merge: true }
  );

  return setDoc(EnterpriseRequestDocRef, {
    user: data,
    createdAt: Timestamp.fromDate(new Date()),
  });
};

export const deniedAccessRequest = (uid: string, enterpriseId: string) => {
  const accessRequestDocRef = doc(
    db,
    firestoreCollections.EnterpriseRequests(enterpriseId) + "/" + uid
  );
  return deleteDoc(accessRequestDocRef);
};

export const acceptAccessRequest = async (
  uid: string,
  enterpriseId: string
) => {
  await deniedAccessRequest(uid, enterpriseId);

  const enterpriseUserDocRef = doc(
    db,
    firestoreCollections.EnterpriseUsers(enterpriseId) + "/" + uid
  );

  return await setDoc(enterpriseUserDocRef, { uid, role: "chofer" });
};

export const fetchUserEnterpriseVehicle = async (
  uid: string,
  enterpriseId: string
) => {
  const userEnterpriseDocRef = doc(
    db,
    firestoreCollections.UserOfEnterprise(enterpriseId, uid)
  );
  return (await getDoc(userEnterpriseDocRef)).get("vehicle");
};

export const saveCurrentVehicle = async (
  uid: string,
  enterpriseId: string,
  vehicle: string
) => {
  const userEnterpriseDocRef = doc(
    db,
    firestoreCollections.UserOfEnterprise(enterpriseId, uid)
  );

  setDoc(
    userEnterpriseDocRef,
    {
      vehicle,
    },
    { merge: true }
  );
};
