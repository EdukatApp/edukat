import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

export default function IsNotEqualTo(property: string, validationOptions?: ValidationOptions) {
  return (object: Object, propertyName: string) => registerDecorator({
    name: 'IsNotEqualTo',
    target: object.constructor,
    propertyName,
    constraints: [property],
    options: validationOptions,
    validator: {
      validate(value: any, args: ValidationArguments): boolean {
        const [relatedPropertyName] = args.constraints;
        const relatedValue = (args.object as any)[relatedPropertyName];

        return typeof value === 'string'
          && typeof relatedValue === 'string'
          && value !== relatedValue;
      },

      defaultMessage(args: ValidationArguments) {
        const [relatedPropertyName] = args.constraints;

        return `$property must not match ${relatedPropertyName} exactly`;
      },
    },
  });
}
