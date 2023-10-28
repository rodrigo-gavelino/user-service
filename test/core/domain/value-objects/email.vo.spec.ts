import Email, { InvalidEmailError } from '@core/domain/value-objects/email.vo';

describe('Email Value Object', () => {
  it('should create a valid email', () => {
    const email = Email.create('test@example.com');
    expect(email.value).toBe('test@example.com');
  });

  it('should throw error for invalid email (no @)', () => {
    expect(() => Email.create('testexample.com')).toThrow(InvalidEmailError);
  });

  it('should throw error for invalid email (invalid characters)', () => {
    expect(() => Email.create('test@exa$mple.com')).toThrow(InvalidEmailError);
  });

  it('should throw error for invalid email (consecutive periods in domain)', () => {
    expect(() => Email.create('test@example..com')).toThrow(InvalidEmailError);
  });

  it('should correctly compare two different emails', () => {
    const emailA = Email.create('testA@example.com');
    const emailB = Email.create('testB@example.com');
    expect(emailA.equals(emailB)).toBe(false);
  });

  it('should correctly compare two same emails', () => {
    const emailA = Email.create('testA@example.com');
    const emailC = Email.create('testA@example.com');
    expect(emailA.equals(emailC)).toBe(true);
  });
});
