import ValueObject from '@core/shared/abstracts/value-object';

class Email extends ValueObject<string> {
  public static create(value: string): Email {
    if (!Email.isValidEmail(value)) {
      throw new InvalidEmailError();
    }
    return new Email(value);
  }

  private constructor(value: string) {
    super(value);
  }

  private static isValidEmail(email: string): boolean {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/; // Expandido para garantir pelo menos dois caracteres no domínio de nível superior
    return regex.test(email);
  }

  public equals(otherEmail: Email): boolean {
    return this._value === otherEmail.value;
  }
}

class InvalidEmailError extends Error {
  constructor() {
    super('Endereço de email inválido.');
    this.name = 'InvalidEmailError';
  }
}

export default Email;
export { InvalidEmailError };
