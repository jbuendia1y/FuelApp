import { Roles, TypeId } from "@/constants";

export interface IVehicleForm {
  placa: string;
}

export interface IVehicle extends IVehicleForm {
  id: TypeId;
}

export interface IFuelFormForm {
  hourMeter: number;
  gallons: number;
  pricePerGallon: number;

  vehicleId: TypeId;
}

export interface IFuelForm extends IFuelFormForm {
  id: TypeId;
  fullPayment: number;
  kmTraveled: number;
  kmPerGallon: number;
  payPerKm: number;
  createdAt: string;

  userId: TypeId;
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
  id: TypeId;
  avatar: string;

  document: string;
  firstName: string;
  lastName: string;

  phone: string;

  role: Roles;
}
