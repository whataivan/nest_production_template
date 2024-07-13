import {
  isEnum,
  registerDecorator,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationOptions,
} from 'class-validator';

/**
 * Checks if a value is an array of values in enum or not
 * @param value Value which is needed to check
 * @param entity Enumeration of satisfying values
 */
export function isEnumArray(
  value: any,
  entity: string[] | Record<string, string>,
) {
  if (!Array.isArray(value)) {
    return false;
  }

  return value.every((v) => isEnum(v, entity));
}

/**
 * Validator for checking if a value is an array of values in enum or not
 * @see [Custom validation classes - Class Validator](https://github.com/typestack/class-validator#custom-validation-classes)
 */
@ValidatorConstraint()
export class EnumArrayConstraint implements ValidatorConstraintInterface {
  constructor(
    /**
     * Enumeration of satisfying values
     */
    private readonly entity: string[] | Record<string, string>,
  ) {}

  /**
   * Method to be called to perform custom validation over given value
   * @param value Value which is needed to check
   */
  validate(value: unknown) {
    return isEnumArray(value, this.entity);
  }

  /**
   * Gets default message when validation for this constraint fail
   */
  defaultMessage(): string {
    return "The value isn't included in enum";
  }
}

/**
 * Property decorator which plugs in checking on value is an array of values in enum or not
 * @see [Custom validation decorators - Class Validator](https://github.com/typestack/class-validator#custom-validation-decorators)
 * @param entity Enumeration of satisfying values
 * @param validationOptions Options used to pass to validation decorators
 */
export function IsEnumArray(
  entity: string[] | Record<string, string>,
  validationOptions?: ValidationOptions,
) {
  return function (object: Record<string, any>, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: new EnumArrayConstraint(entity),
    });
  };
}
