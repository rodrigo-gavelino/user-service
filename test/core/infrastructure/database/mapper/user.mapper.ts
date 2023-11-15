import User from '@core/domain/entities/user.entity';
import Email from '@core/domain/value-objects/email.vo';
import { Password } from '@core/domain/value-objects/password.vo';
import { UserMapper } from '@core/infrastructure/database/mappers/user.mapper';
import { UserDocument } from '@core/infrastructure/database/schemas/user.schema';
import mongoose from 'mongoose';

describe('UserMapper', () => {
  describe('toPersistence', () => {
    it('should correctly map a User entity to a UserMongooseSchema object', () => {
      const user = User.create({
        _id: 'some-id',
        name: 'John Doe',
        email: Email.create('john@example.com'),
        password: Password.create('Password123!'),
      });

      const mappedObject = UserMapper.toPersistence(user);

      expect(mappedObject).toEqual({
        name: 'John Doe',
        email: 'john@example.com',
        password: 'Password123!',
        emailVerified: false,
        isActive: true,
      });
    });
  });

  describe('toDomain', () => {
    it('should correctly map a UserDocument to a User entity', async () => {
      const userDoc = {
        _id: new mongoose.Types.ObjectId().toString(),
        name: 'Jane Doe',
        email: 'jane@example.com',
        password: 'Password123!',
        emailVerified: false,
        isActive: true,
        createdAt: new Date(),
      };

      const user = await UserMapper.toDomain(userDoc as UserDocument);

      expect(user.id).toBe(userDoc._id.toString());
      expect(user.name).toBe(userDoc.name);
      expect(user.email.value).toBe(userDoc.email);
      expect(user.password.value).toBe(userDoc.password);
      expect(user.emailVerified).toBe(userDoc.emailVerified);
      expect(user.isActive).toBe(userDoc.isActive);
    });
  });
});
