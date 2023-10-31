import IUserServiceRepository from '@core/shared/domain/repositories/user-service.interface.repository';
import User from '../entities/user.entity';
import Email from '../value-objects/email.vo';

interface IUserRepository extends IUserServiceRepository<User> {
  findByEmail(email: Email): Promise<User | null>;
}

export default IUserRepository;
