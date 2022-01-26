import { TypeId } from "@/constants";
import { WriteI, ReadI } from "./interfaces";
import {Page} from "@/interfaces"

export default class BaseRepository<T, I = T>
  implements WriteI<T, I>, ReadI<T>
{
  create(item: I): Promise<T> {
    return new Promise((resolve, reject) => {
      throw new Error("This method is incomplete, write the code .");
    });
  }

  delete(id: TypeId): Promise<boolean> {
    return new Promise((resolve, reject) => {
      throw new Error("This method is incomplete, write the code .");
    });
  }

  update(id: TypeId, item: T): Promise<T> {
    return new Promise((resolve, reject) => {
      throw new Error("This method is incomplete, write the code .");
    });
  }

  fetchAll(params?: any): Promise<T[]> {
    return new Promise((resolve, reject) => {
      throw new Error("This method is incomplete, write the code .");
    });
  }

  paginated(params?:any):Promise<Page<T>>{
    return new Promise((resolve, reject) => {
      throw new Error("This method is incomplete, write the code .");
    });
  }

  fetchOne(id: TypeId): Promise<T> {
    return new Promise((resolve, reject) => {
      throw new Error("This method is incomplete, write the code .");
    });
  }
}
