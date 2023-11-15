import Email, { InvalidEmailError } from '@core/domain/value-objects/email.vo';

// Dados de exemplo para testes
const validEmail = 'example@example.com';
const longString = 'a'.repeat(256); // String longa para testar limites de comprimento

describe('Email Creation', () => {
  it('should create an Email object with a valid email', () => {
    expect(() => Email.create(validEmail)).not.toThrow();
    const email = Email.create(validEmail);
    expect(email).toBeInstanceOf(Email);
    expect(email.value).toBe(validEmail);
  });
});

describe('Email Validation', () => {
  it('should throw InvalidEmailError for empty email', () => {
    expect(() => Email.create('')).toThrow(InvalidEmailError);
  });

  it('should throw InvalidEmailError for missing local part', () => {
    expect(() => Email.create('@example.com')).toThrow(InvalidEmailError);
  });

  it('should throw InvalidEmailError for missing domain', () => {
    expect(() => Email.create('example@')).toThrow(InvalidEmailError);
  });

  it('should throw InvalidEmailError for excessive local part length', () => {
    expect(() => Email.create(`${longString}@example.com`)).toThrow(
      InvalidEmailError,
    );
  });

  it('should throw InvalidEmailError for excessive domain length', () => {
    expect(() => Email.create(`example@${longString}.com`)).toThrow(
      InvalidEmailError,
    );
  });

  it('should throw InvalidEmailError for total length over 320 characters', () => {
    const veryLongEmail = `${longString}@${longString}.com`;
    expect(() => Email.create(veryLongEmail)).toThrow(InvalidEmailError);
  });

  it('should throw InvalidEmailError for invalid email format', () => {
    const invalidEmails = [
      'example.com',
      'example@.com',
      'exa mple@example.com',
      'example@example..com',
    ];
    invalidEmails.forEach((email) => {
      expect(() => Email.create(email)).toThrow(InvalidEmailError);
    });
  });

  it('should throw InvalidEmailError for domain with consecutive periods', () => {
    expect(() => Email.create('example@exa..mple.com')).toThrow(
      InvalidEmailError,
    );
  });
});

describe('Email Equality', () => {
  it('should return true for equal emails', () => {
    const email1 = Email.create(validEmail);
    const email2 = Email.create(validEmail);
    expect(email1.equals(email2)).toBe(true);
  });

  it('should return false for different emails', () => {
    const email1 = Email.create('test1@example.com');
    const email2 = Email.create('test2@example.com');
    expect(email1.equals(email2)).toBe(false);
  });
});
