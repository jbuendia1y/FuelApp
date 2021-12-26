import { Roles } from "@/constants";

export interface IVehicleForm {
  placa: string;
}

export interface IVehicle extends IVehicleForm {
  id: number;
}

export interface IFuelFormForm {
  hourMeter: number;
  gallons: number;
  pricePerGallon: number;

  vehicleId: number;
}

export interface IFuelForm extends IFuelFormForm {
  id: number;
  fullPayment: number;
  kmTraveled: number;
  kmPerGallon: number;
  payPerKm: number;
  createdAt: string;

  userId: number;
}

export interface IFuelFormPopulate extends IFuelForm {
  user: IUser;
  vehicle: IVehicle;
}

export interface IUserRegister {
  document: string;

  firstName: string;
  lastName: string;
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
