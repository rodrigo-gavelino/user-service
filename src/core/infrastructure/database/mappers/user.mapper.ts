import User from '@core/domain/entities/user.entity';
import Email from '@core/domain/value-objects/email.vo';
import { UserDocument, UserMongooseSchema } from '../schemas/user.schema';
import { Password } from '@core/domain/value-objects/password.vo';

class UserMapper {
  static toPersistence(user: User): Partial<UserMongooseSchema> {
    return {
      name: user.name,
      email: user.email.value,
      password: user.password.value,
      emailVerified: user.emailVerified,
      isActive: user.isActive,
    };
  }

  static async toDomain(userDoc: UserDocument): Promise<User> {
    const emailVO = Email.create(userDoc.email);
    const passwordVO = await Password.create(userDoc.password);

    return User.create({
      id: userDoc._id.toString(),
      name: userDoc.name,
      email: emailVO,
      password: passwordVO,
    });
  }
}

export { UserMapper };
