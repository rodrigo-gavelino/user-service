import User, {
  InvalidUserNameError,
  UserCreateCommandProps,
} from '@core/domain/entities/user.entity';
import Email from '@core/domain/value-objects/email.vo';
import Password from '@core/domain/value-objects/password.vo';

describe('User Entity', () => {
  const validEmail = Email.create('test@example.com');
  const validPassword = Password.create('Test@1234');

  const userProps: UserCreateCommandProps = {
    name: 'John Doe',
    email: validEmail,
    password: validPassword,
  };

  describe('create()', () => {
    it('should successfully create a user', () => {
      const user = User.create(userProps);
      expect(user.name).toBe('John Doe');
      expect(user.email).toEqual(validEmail);
      expect(user.password).toEqual(validPassword);
      expect(user.emailVerified).toBe(false);
      expect(user.isActive).toBe(true);
    });
  });

  describe('verifyEmail()', () => {
    it('should verify user email', () => {
      const user = User.create(userProps);
      user.verifyEmail();
      expect(user.emailVerified).toBe(true);
    });
  });

  describe('changeName()', () => {
    it('should change user name', () => {
      const user = User.create(userProps);
      user.changeName('Jane Doe');
      expect(user.name).toBe('Jane Doe');
    });

    it('should throw an error for empty name', () => {
      const user = User.create(userProps);
      expect(() => {
        user.changeName('');
      }).toThrow(InvalidUserNameError);
    });
  });

  describe('deactivateUser()', () => {
    it('should deactivate a user', () => {
      const user = User.create(userProps);
      user.deactivateUser();
      expect(user.isActive).toBe(false);
    });
  });

  describe('reactivateUser()', () => {
    it('should reactivate a user', () => {
      const user = User.create(userProps);
      user.deactivateUser();
      user.reactivateUser();
      expect(user.isActive).toBe(true);
    });
  });

  describe('equals()', () => {
    it('should return true for matching users', () => {
      const user1 = User.create(userProps);
      const user2 = User.create(userProps);
      expect(user1.equals(user2)).toBe(true);
    });

    it('should return false for different users', () => {
      const user1 = User.create(userProps);
      const user2 = User.create({
        ...userProps,
        name: 'Jane Doe',
      });
      expect(user1.equals(user2)).toBe(false);
    });
  });
});
