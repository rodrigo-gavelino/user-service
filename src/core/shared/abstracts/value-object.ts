abstract class ValueObject<T> {
  protected readonly _value: T;

  protected constructor(value: T) {
    this._value = value;
  }

  public abstract equals(vo: ValueObject<T>): boolean;

  get value(): T {
    return this._value;
  }
}

export default ValueObject;
