import ValueObject from '@core/shared/abstracts/value-object';
import HashingService from '@core/shared/interfaces/hash-service.interface';

class Password extends ValueObject<string> {
  public static create(value: string): Password {
    if (!Password.isValidPassword(value)) {
      throw new InvalidPasswordError();
    }
    return new Password(value);
  }

  private constructor(value: string) {
    super(value);
  }

  private static isValidPassword(password: string): boolean {
    const minLength = password.length >= 8;
    const hasNumber = /\d/.test(password);
    const hasUppercase = /[A-Z]/.test(password);
    const hasSpecialCharacter = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    return minLength && hasNumber && hasUppercase && hasSpecialCharacter;
  }

  public static async fromPlainText(
    password: string,
    hashingService: HashingService,
  ): Promise<Password> {
    if (!Password.isValidPassword(password)) {
      throw new InvalidPasswordError(
        'A senha deve atender aos requisitos de complexidade.',
      );
    }
    const hashed = await hashingService.hash(password, 10);
    return new Password(hashed);
  }

  public async matches(
    password: string,
    hashingService: HashingService,
  ): Promise<boolean> {
    return hashingService.compare(password, this._value);
  }

  public equals(otherPassword: Password): boolean {
    return this._value === otherPassword.value;
  }
}

class InvalidPasswordError extends Error {
  constructor(message: string = 'Senha inválida.') {
    super(message);
    this.name = 'InvalidPasswordError';
  }
}

export default Password;
export { InvalidPasswordError };
