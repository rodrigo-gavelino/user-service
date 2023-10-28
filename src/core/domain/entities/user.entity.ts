import Email from '../value-objects/email.vo';
import { Password } from '../value-objects/password.vo';

type UserConstructorProps = {
  name: string;
  email: Email;
  password: Password;
  emailVerified?: boolean;
};

export { UserConstructorProps };

type UserCreateCommandProps = {
  id?: string;
  name: string;
  email: Email;
  password: Password;
};

export { UserCreateCommandProps };

class User {
  private _id?: string;
  private _name: string;
  private _email: Email;
  private _password: Password;
  private _emailVerified: boolean;
  private _isActive: boolean;

  constructor(props: UserConstructorProps) {
    this._name = props.name;
    this._email = props.email;
    this._password = props.password;
    this._emailVerified = props.emailVerified || false;
    this._isActive = true;
  }

  static create(props: UserCreateCommandProps): User {
    return new User(props);
  }

  get name(): string {
    return this._name;
  }

  get email(): Email {
    return this._email;
  }

  get id(): string | undefined {
    return this._id;
  }

  get password(): Password {
    return this._password;
  }

  get emailVerified(): boolean {
    return this._emailVerified;
  }

  get isActive(): boolean {
    return this._isActive;
  }

  verifyEmail(): void {
    this._emailVerified = true;
  }

  changeName(newName: string): void {
    if (newName.trim() === '') {
      throw new InvalidUserNameError('O nome não pode ser vazio.');
    }
    this._name = newName;
  }

  deactivateUser(): void {
    this._isActive = false;
  }

  reactivateUser(): void {
    this._isActive = true;
  }

  equals(other: User): boolean {
    return (
      this._name === other._name &&
      this._email.equals(other._email) && // Usando o método equals do VO Email
      this._password.equals(other._password) && // Usando o método equals do VO Password
      this._emailVerified === other._emailVerified &&
      this._isActive === other._isActive
    );
  }
}

export default User;

class InvalidUserNameError extends Error {
  constructor(message: string = 'O nome fornecido é inválido.') {
    super(message);
    this.name = 'InvalidUserNameError';
  }
}

export { InvalidUserNameError };
