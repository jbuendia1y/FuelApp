import { Roles } from "@/constants";

export interface IVehicle {
  id: number;
  placa: string;
}

export interface IFuelFormForm {
  hourmeter: number;
  gallons: number;
  pricePerGallon: number;

  vehicleId: number;
}

export interface IFuelForm extends IFuelFormForm {
  fullPayment: number;
  kmTraveled: number;
  kmPerGallon: number;
  payPerKm: number;
  createdAt: string;

  userId: number;
}

export interface IUser {
  id: number;
  avatar: string;

  document: string;
  firstName: string;
  lastName: string;

  phone: string;

  role: Roles;
}
