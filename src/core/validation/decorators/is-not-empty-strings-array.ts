import {
  isString,
  minLength,
  registerDecorator,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationOptions,
} from 'class-validator';

/**
 * Checks if a value is an array of not empty strings or not
 * @param value Value which is needed to check
 */
export function isNotEmptyStringsArray(value: unknown) {
  if (!Array.isArray(value)) {
    return false;
  }

  return value.every((v) => isString(v) && minLength(v, 1));
}

/**
 * Validator for checking if a value is an array of not empty strings or not
 * @see [Custom validation classes - Class Validator](https://github.com/typestack/class-validator#custom-validation-classes)
 */
@ValidatorConstraint()
export class NotEmptyStringsArrayConstraint
  implements ValidatorConstraintInterface
{
  /**
   * Method to be called to perform custom validation over given value
   * @param value Value which is needed to check
   */
  validate(value: unknown) {
    return isNotEmptyStringsArray(value);
  }

  /**
   * Gets default message when validation for this constraint fail
   */
  defaultMessage(): string {
    return "The value isn't string or it's empty string";
  }
}

/**
 * Property decorator which plugs in checking on value is an array of not empty strings or not
 * @see [Custom validation decorators - Class Validator](https://github.com/typestack/class-validator#custom-validation-decorators)
 * @param validationOptions Options used to pass to validation decorator
 */
export function IsNotEmptyStringsArray(validationOptions?: ValidationOptions) {
  return function (object: Record<string, any>, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: NotEmptyStringsArrayConstraint,
    });
  };
}
