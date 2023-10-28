import {
  InvalidPasswordError,
  Password,
} from '@core/domain/value-objects/password.vo';

describe('Password', () => {
  describe('constructor', () => {
    it('should accept a valid password', () => {
      const validPasswords = ['Password1!', 'Test@1234', 'Aa123456$'];

      validPasswords.forEach((password) => {
        expect(() => new Password(password)).not.toThrow();
      });
    });

    it('should throw InvalidPasswordError for passwords with less than 8 characters', () => {
      const shortPassword = 'Pas$1';
      expect(() => new Password(shortPassword)).toThrow(InvalidPasswordError);
    });

    it('should throw InvalidPasswordError for passwords without a number', () => {
      const passwordWithoutNumber = 'Password!';
      expect(() => new Password(passwordWithoutNumber)).toThrow(
        InvalidPasswordError,
      );
    });

    it('should throw InvalidPasswordError for passwords without an uppercase letter', () => {
      const passwordWithoutUppercase = 'password1!';
      expect(() => new Password(passwordWithoutUppercase)).toThrow(
        InvalidPasswordError,
      );
    });

    it('should throw InvalidPasswordError for passwords without a special character', () => {
      const passwordWithoutSpecialChar = 'Password1';
      expect(() => new Password(passwordWithoutSpecialChar)).toThrow(
        InvalidPasswordError,
      );
    });
  });
});
