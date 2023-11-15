import User, { InvalidUserNameError } from '@core/domain/entities/user.entity';
import Email, { InvalidEmailError } from '@core/domain/value-objects/email.vo';
import {
  InvalidPasswordError,
  Password,
} from '@core/domain/value-objects/password.vo';

describe('User', () => {
  const validProps = {
    name: 'John Doe',
    email: Email.create('john@example.com'),
    password: Password.create('Password123!'),
  };

  describe('create method', () => {
    it('should create a user successfully with valid properties', () => {
      const user = User.create(validProps);
      expect(user).toBeInstanceOf(User);
    });

    it('should create a user successfully with valid properties', () => {
      const user = User.create(validProps);
      expect(user).toBeInstanceOf(User);
    });

    it('should throw InvalidUserNameError for empty name', () => {
      expect(() => User.create({ ...validProps, name: '' })).toThrow(
        InvalidUserNameError,
      );
    });

    it('should throw InvalidEmailError for invalid email', () => {
      expect(() =>
        User.create({ ...validProps, email: Email.create('invalid') }),
      ).toThrow(InvalidEmailError);
    });

    it('should throw InvalidPasswordError for invalid password', () => {
      expect(() =>
        User.create({ ...validProps, password: Password.create('invalid') }),
      ).toThrow(InvalidPasswordError);
    });

    it('should throw InvalidUserNameError for name with more than 64 characters', () => {
      expect(() =>
        User.create({
          ...validProps,
          name: 'a'.repeat(65),
        }),
      ).toThrow(InvalidUserNameError);
    });

    it('should throw InvalidEmailError for email with more than 320 characters', () => {
      expect(() =>
        User.create({
          ...validProps,
          email: Email.create(`a${'a'.repeat(320)}@example.com`),
        }),
      ).toThrow(InvalidEmailError);
    });

    it('should throw InvalidPasswordError for password with less than 8 characters', () => {
      expect(() =>
        User.create({
          ...validProps,
          password: Password.create('Abc1!'),
        }),
      ).toThrow(InvalidPasswordError);
    });

    it('should throw InvalidPasswordError for password without numbers', () => {
      expect(() =>
        User.create({
          ...validProps,
          password: Password.create('Abcdefgh!'),
        }),
      ).toThrow(InvalidPasswordError);
    });

    it('should throw InvalidPasswordError for password without uppercase letters', () => {
      expect(() =>
        User.create({
          ...validProps,
          password: Password.create('abcdefg1!'),
        }),
      ).toThrow(InvalidPasswordError);
    });

    it('should throw InvalidPasswordError for password without special characters', () => {
      expect(() =>
        User.create({
          ...validProps,
          password: Password.create('Abcdefg1'),
        }),
      ).toThrow(InvalidPasswordError);
    });

    it('should throw InvalidPasswordError for password with more than 64 characters', () => {
      expect(() =>
        User.create({
          ...validProps,
          password: Password.create('a'.repeat(65)),
        }),
      ).toThrow(InvalidPasswordError);
    });
  });

  describe('changePassword method', () => {
    it('should change the password of the user', () => {
      const user = User.create(validProps);
      user.changePassword('NewPassword123!');
      expect(user.password.equals(Password.create('NewPassword123!'))).toBe(
        true,
      );
    });

    it('should throw InvalidPasswordError for invalid new password', () => {
      const user = User.create(validProps);
      expect(() => user.changePassword('invalid')).toThrow(
        InvalidPasswordError,
      );
    });
  });

  describe('verifyEmail method', () => {
    it('should set emailVerified to true', () => {
      const user = User.create(validProps);
      user.verifyEmail();
      expect(user.emailVerified).toBe(true);
    });
  });

  describe('changeName method', () => {
    it('should change the name of the user', () => {
      const user = User.create(validProps);
      user.changeName('Jane Doe');
      expect(user.name).toBe('Jane Doe');
    });

    it('should throw InvalidUserNameError for empty new name', () => {
      const user = User.create(validProps);
      expect(() => user.changeName('')).toThrow(InvalidUserNameError);
    });
  });

  describe('deactivateUser and reactivateUser methods', () => {
    it('should deactivate and reactivate the user', () => {
      const user = User.create(validProps);
      user.deactivateUser();
      expect(user.isActive).toBe(false);

      user.reactivateUser();
      expect(user.isActive).toBe(true);
    });
  });

  describe('equals method', () => {
    it('should return true for equal users', () => {
      const user1 = User.create(validProps);
      const user2 = User.create(validProps);
      expect(user1.equals(user2)).toBe(true);
    });

    it('should return false for different users', () => {
      const user1 = User.create(validProps);
      const user2 = User.create({ ...validProps, name: 'Different Name' });
      expect(user1.equals(user2)).toBe(false);
    });
  });

  describe('ID Getter', () => {
    it('should return the correct ID for a user with an externally assigned ID', () => {
      const externalId = '12345';
      const user = new User({
        _id: externalId,
        name: 'John Doe',
        email: Email.create('john@example.com'),
        password: Password.create('Password123!'),
      });

      expect(user.id).toBe(externalId);
    });
  });

  describe('Constructor', () => {
    const userProps = {
      _id: 'unique-id',
      name: 'John Doe',
      email: Email.create('john@example.com'),
      password: Password.create('Password123!'),
      emailVerified: false,
    };

    let user;

    beforeEach(() => {
      user = new User(userProps);
    });
    it('should deactivate the user correctly', () => {
      user.deactivateUser();
      expect(user.isActive).toBe(false);
    });

    it('should reactivate the user correctly', () => {
      user.deactivateUser();
      user.reactivateUser();
      expect(user.isActive).toBe(true);
    });

    it('should prevent certain actions when user is deactivated', () => {
      user.deactivateUser();
    });

    it('should allow certain actions when user is reactivated', () => {
      user.deactivateUser();
      user.reactivateUser();
    });
  });

  describe('Boundary Conditions', () => {
    const validProps = {
      name: 'John Doe',
      email: Email.create('john@example.com'),
      password: Password.create('Password123!'),
    };

    describe('Handling edge cases in user creation', () => {
      it('should handle edge case when name is exactly 3 characters', () => {
        const edgeCaseProps = { ...validProps, name: 'Bob' };
        expect(() => User.create(edgeCaseProps)).not.toThrow();
      });

      it('should handle edge case when name is exactly 20 characters', () => {
        const edgeCaseProps = { ...validProps, name: 'a'.repeat(20) };
        expect(() => User.create(edgeCaseProps)).not.toThrow();
      });
    });

    describe('Handling edge cases in user methods', () => {
      let user;

      beforeEach(() => {
        user = User.create(validProps);
      });

      it('should handle edge case when changing name to a valid extreme value', () => {
        const newName = 'a'.repeat(20);
        expect(() => user.changeName(newName)).not.toThrow();
      });

      it('should handle edge case when changing name to a valid extreme value', () => {
        const newName = 'a'.repeat(3);
        expect(() => user.changeName(newName)).not.toThrow();
      });

      it('should handle edge case when changing password to a valid extreme value', () => {
        const extremeValidPassword = 'A1'.repeat(10) + '!';
        expect(() => user.changePassword(extremeValidPassword)).not.toThrow();
      });

      it('should handle edge case when changing password to a valid extreme value', () => {
        const extremeValidPassword = 'A1b2C3d4E5f6G7h8!';
        expect(() => user.changePassword(extremeValidPassword)).not.toThrow();
      });
    });
  });
});
