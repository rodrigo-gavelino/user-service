import {
  InvalidPasswordError,
  Password,
} from '@core/domain/value-objects/password.vo';

// Dados de exemplo para os testes
const validPassword = 'Valid123!';

describe('Password Creation', () => {
  it('should create a Password object with a valid password', () => {
    expect(() => Password.create(validPassword)).not.toThrow();
    const password = Password.create(validPassword);
    expect(password).toBeInstanceOf(Password);
  });
});

describe('Password Validation', () => {
  it('should throw InvalidPasswordError for empty password', () => {
    expect(() => Password.create('')).toThrow(InvalidPasswordError);
  });

  it('should throw InvalidPasswordError for password length less than 8 characters', () => {
    expect(() => Password.create('Abc1!')).toThrow(InvalidPasswordError);
  });

  it('should throw InvalidPasswordError for password without numbers', () => {
    expect(() => Password.create('Abcdefgh!')).toThrow(InvalidPasswordError);
  });

  it('should throw InvalidPasswordError for password without uppercase letters', () => {
    expect(() => Password.create('abcdefg1!')).toThrow(InvalidPasswordError);
  });

  it('should throw InvalidPasswordError for password without special characters', () => {
    expect(() => Password.create('Abcdefg1')).toThrow(InvalidPasswordError);
  });
});

describe('Password Equality', () => {
  it('should return true for equal passwords', () => {
    const password1 = Password.create(validPassword);
    const password2 = Password.create(validPassword);
    expect(password1.equals(password2)).toBe(true);
  });

  it('should return false for different passwords', () => {
    const password1 = Password.create('Valid123!');
    const password2 = Password.create('Another1!');
    expect(password1.equals(password2)).toBe(false);
  });
});
