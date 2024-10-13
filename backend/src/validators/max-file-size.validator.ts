import { registerDecorator, ValidationOptions } from 'class-validator';

const MEGABYTE = 1024 * 1024;

export function MaxFileSize(
  maxSizeInBytes: number,
  validationOptions?: ValidationOptions,
) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'MaxFileSize',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: string) {
          return getSizeInBytes(value) <= maxSizeInBytes;
        },

        defaultMessage() {
          return `File size must not exceed ${maxSizeInBytes / MEGABYTE}MB`;
        },
      },
    });
  };
}

function getSizeInBytes(value: string): number {
  const byteSize = new TextEncoder().encode(value).length;
  return byteSize;
}
