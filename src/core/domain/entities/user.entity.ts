import Email from '../value-objects/email.vo';
import { Password } from '../value-objects/password.vo';

type UserConstructorProps = {
  _id?: string;
  name: string;
  email: Email;
  password: Password;
  emailVerified?: boolean;
};

export { UserConstructorProps };

type UserCreateCommandProps = {
  _id?: string;
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
    this._id = props._id;
    this._name = props.name;
    this._email = props.email;
    this._password = props.password;
    this._emailVerified = props.emailVerified || false;
    this._isActive = true;
  }

  static create(props: UserCreateCommandProps): User {
    const regexContainsNumber = /\d/;
    const regexSpecialCharacters = /[^a-zA-Z\s]/;

    if (!props.name) {
      throw new InvalidUserNameError('Name must not be empty.');
    }
    const nameSIze = props.name.trim().length || 0;

    if (nameSIze < 3 || nameSIze > 20) {
      throw new InvalidUserNameError(
        'Name must be between 3 and 20 characters.',
      );
    }

    if (regexContainsNumber.test(props.name)) {
      throw new InvalidUserNameError('Name must not contain numbers.');
    }

    if (regexSpecialCharacters.test(props.name)) {
      throw new InvalidUserNameError(
        'Name must not contain special characters.',
      );
    }

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
    const regexContainsNumber = /\d/;
    const regexSpecialCharacters = /[^a-zA-Z\s]/;
    if (
      newName.trim() === '' ||
      newName.trim().length < 3 ||
      newName.trim().length > 20 ||
      regexContainsNumber.test(newName) ||
      regexSpecialCharacters.test(newName)
    ) {
      throw new InvalidUserNameError('O nome não pode ser vazio.');
    }
    this._name = newName;
  }

  changePassword(newPassword: string): void {
    const password = Password.create(newPassword); // Assume que Password faz a validação necessária
    this._password = password;
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
      this._email.equals(other._email) &&
      this._password.equals(other._password) &&
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
