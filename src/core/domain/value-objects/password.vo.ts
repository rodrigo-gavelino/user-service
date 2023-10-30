import ValueObject from '@core/shared/abstracts/value-object';

export class Password extends ValueObject<string> {
  constructor(value: string) {
    super(value);
    this.validate();
  }

  public static create(value: string): Password {
    return new Password(value);
  }

  private validate() {
    if (!this.value) {
      throw new InvalidPasswordError('Password cannot be empty.');
    }

    if (this.value.length < 8) {
      throw new InvalidPasswordError(
        'Password must have at least 8 characters.',
      );
    }

    if (!/\d/.test(this.value)) {
      throw new InvalidPasswordError(
        'Password must contain at least 1 number.',
      );
    }

    if (!/[A-Z]/.test(this.value)) {
      throw new InvalidPasswordError(
        'Password must contain at least 1 uppercase letter.',
      );
    }

    // Define a regex for special characters. This example includes common ones, but you can adjust as needed.
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(this.value)) {
      throw new InvalidPasswordError(
        'Password must contain at least 1 special character.',
      );
    }
  }

  public equals(vo: ValueObject<string>): boolean {
    return this.value === vo.value;
  }
}

export class InvalidPasswordError extends Error {
  constructor(message?: string) {
    super(message);
    this.name = 'InvalidPasswordError';
  }
}
