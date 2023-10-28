interface IUserServiceRepository<T> {
  create(item: T): Promise<T>;
  find(id: string): Promise<T | null>;
  findAll(): Promise<T[]>;
  update(id: string, item: T): Promise<T>;
  delete(id: string): Promise<void>;
}

export default IUserServiceRepository;
