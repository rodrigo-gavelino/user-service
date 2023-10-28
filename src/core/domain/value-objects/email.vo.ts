import ValueObject from '@core/shared/abstracts/value-object';

class Email extends ValueObject<string> {
  private constructor(value: string) {
    super(value);
    this.validate();
  }
  public static create(value: string): Email {
    return new Email(value);
  }

  private validate() {
    if (!this.value) {
      throw new InvalidEmailError('Email cannot be empty');
    }

    const [localPart, domain] = this.value.split('@');

    if (!localPart || !domain) {
      throw new InvalidEmailError(
        'Email must contain a local part and a domain',
      );
    }

    if (
      localPart.length > 64 ||
      domain.length > 255 ||
      this.value.length > 320
    ) {
      throw new InvalidEmailError('Email exceeds allowable length');
    }

    const regex =
      /^(?!.*\.\.|.*\.@|^\.|.*@\.)[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]+$/;

    if (!regex.test(this.value)) {
      throw new InvalidEmailError(
        'Email contains invalid characters or format',
      );
    }

    if (/(\.\.)/.test(domain)) {
      throw new InvalidEmailError(
        'Email domain cannot have consecutive periods',
      );
    }
  }

  public equals(otherEmail: Email): boolean {
    return this._value === otherEmail.value;
  }
}

class InvalidEmailError extends Error {
  constructor(message?: string) {
    super(message);
    this.name = 'InvalidEmailError';
  }
}

export default Email;
export { InvalidEmailError };
