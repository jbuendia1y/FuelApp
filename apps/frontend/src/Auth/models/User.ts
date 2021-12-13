import { Roles } from "@/constants";
import { IUser } from "@/interfaces";

export default class User implements IUser {
  id: number;
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
    if (this.firstName.includes(" ") && this.lastName.includes(" ")) {
      const firstName = this.firstName.split(" ");
      const lastName = this.lastName.split(" ");

      return firstName + " " + lastName;
    }
    return this.firstName;
  }
}
