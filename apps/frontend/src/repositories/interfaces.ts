import { TypeId } from "@/constants";

export interface WriteI<T, I> {
  create(item: I): Promise<any>;
  update(id: TypeId, item: T): Promise<any>;
  delete(id: TypeId): Promise<boolean>;
}

export interface ReadI<T> {
  fetchOne(id: TypeId): Promise<T>;
  fetchAll(): Promise<T[]>;
}
