import ICreateUserDTO from '@users/dtos/ICreateUserDTO';
import User from '@users/entities/User';

export default interface IUserRepository {
  getAll(): Promise<User[]>;

  findById(id: string): Promise<User>;

  findByEmail(email: string): Promise<User>;

  findByUsername(username: string): Promise<User>;

  create(data: ICreateUserDTO): Promise<void>;

  clear(): Promise<void>;
}
