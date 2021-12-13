export interface WriteI<T> {
  create(item: T): Promise<any>;
  update(id: string, item: T): Promise<any>;
  delete(id: string): Promise<boolean>;
}

export interface ReadI<T> {
  fetchOne(id: string): Promise<T>;
  fetchAll(): Promise<T[]>;
}
