import { WriteI, ReadI } from "./interfaces";

export default class BaseRepository<T, I = T> implements WriteI<T>, ReadI<I> {
  create(item: T): Promise<I> {
    return new Promise((resolve, reject) => {
      throw new Error("This method is incomplete, write the code .");
    });
  }

  delete(id: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      throw new Error("This method is incomplete, write the code .");
    });
  }

  update(id: string, item: T): Promise<I> {
    return new Promise((resolve, reject) => {
      throw new Error("This method is incomplete, write the code .");
    });
  }

  fetchAll(params?: any): Promise<I[]> {
    return new Promise((resolve, reject) => {
      throw new Error("This method is incomplete, write the code .");
    });
  }

  fetchOne(id: string): Promise<I> {
    return new Promise((resolve, reject) => {
      throw new Error("This method is incomplete, write the code .");
    });
  }
}
