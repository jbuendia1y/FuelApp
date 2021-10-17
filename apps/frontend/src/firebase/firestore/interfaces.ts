import { Timestamp } from "@firebase/firestore";

export interface FuelPerformanceForm {
  // Datos necesarios para computar
  horometro: number;
  galones: number;
  precioPorGalon: number;
  // Datos del usuario
  userId: string;
  user?: any;
}

export interface FuelPerformanceDoc extends FuelPerformanceForm {
  // Datos añadidos por el sistema
  createdAt: Timestamp;
  kmRecorrido: number;
  kmPorGalon: number;
  pagoPorKm: number;
  pagoTotal: number;
}
