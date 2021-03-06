import { Roles, TypeId } from "@/constants";
import { IUser } from "@/interfaces";

export default class User implements IUser {
  id: TypeId;
  avatar: string;

  document: string;
  firstName: string;
  lastName: string;
  phone: string;

  role: Roles;

  constructor(data: IUser) {
    this.id = data.id;
    this.avatar = data.avatar;
    this.document = data.document;
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.phone = data.phone;

    this.role = data.role;
  }

  getFullName() {
    return this.firstName + " " + this.lastName;
  }

  getShortName() {
    if (!this.firstName.includes(" ") || !this.lastName.includes(" ")) {
      return this.firstName;
    }

    const firstName = this.firstName.split(" ")[1];
    const lastName = this.lastName.split(" ")[0];

    return firstName + " " + lastName;
  }
}
