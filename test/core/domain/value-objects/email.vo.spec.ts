import Email, { InvalidEmailError } from '@core/domain/value-objects/email.vo';

describe('Email Value Object', () => {
  describe('Creation', () => {
    it('should create a valid Email object', () => {
      const email = 'john.doe@example.com';
      const emailVO = Email.create(email);
      expect(emailVO.value).toBe(email);
    });

    it('should throw InvalidEmailError for invalid email', () => {
      const email = 'invalid-email';
      expect(() => Email.create(email)).toThrow(InvalidEmailError);
    });
  });

  describe('Equality', () => {
    it('should return true for two equal emails', () => {
      const email1 = Email.create('john.doe@example.com');
      const email2 = Email.create('john.doe@example.com');
      expect(email1.equals(email2)).toBe(true);
    });

    it('should return false for two different emails', () => {
      const email1 = Email.create('john.doe@example.com');
      const email2 = Email.create('jane.doe@example.com');
      expect(email1.equals(email2)).toBe(false);
    });
  });
});
