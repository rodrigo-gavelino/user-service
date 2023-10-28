import IUserRepository from '@core/domain/repositories/user.interface.repository';
import { Model } from 'mongoose';
import User from '@core/domain/entities/user.entity';
import { UserMapper } from '../mappers/user.mapper';
import Email from '@core/domain/value-objects/email.vo';
import { UserDocument } from '../schemas/user.schema';

export class UserRepository implements IUserRepository {
  constructor(private readonly userModel: Model<UserDocument>) {}

  async create(user: User): Promise<User> {
    const userDTO = UserMapper.toPersistence(user);
    const createdUser = await this.userModel.create(userDTO);
    return UserMapper.toDomain(createdUser);
  }

  async find(id: string): Promise<User | null> {
    const userDoc = await this.userModel.findById(id).exec();
    if (!userDoc) return null;
    return UserMapper.toDomain(userDoc);
  }

  async findAll(): Promise<User[]> {
    const usersDoc = await this.userModel.find().exec();
    const users = await Promise.all(usersDoc.map(UserMapper.toDomain));
    return users;
  }

  async update(id: string, user: User): Promise<User> {
    const userDTO = UserMapper.toPersistence(user);
    const updatedUser = await this.userModel
      .findByIdAndUpdate(id, userDTO, { new: true })
      .exec();
    if (!updatedUser) throw new Error('User not found'); // Você pode manejar essa situação conforme sua preferência
    return UserMapper.toDomain(updatedUser);
  }

  async delete(id: string): Promise<void> {
    await this.userModel.findByIdAndDelete(id).exec();
  }

  async findByEmail(email: Email): Promise<User | null> {
    const userDoc = await this.userModel.findOne({ email: email.value }).exec();
    if (!userDoc) return null;
    return UserMapper.toDomain(userDoc);
  }
}
