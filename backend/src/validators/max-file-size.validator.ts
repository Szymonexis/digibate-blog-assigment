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
        validate(value: object) {
          return getObjectSizeInBytes(value) <= maxSizeInBytes;
        },

        defaultMessage() {
          return `File size must not exceed ${maxSizeInBytes / MEGABYTE}MB`;
        },
      },
    });
  };
}

function getObjectSizeInBytes(obj: object): number {
  const objectString = JSON.stringify(obj);
  const byteSize = new TextEncoder().encode(objectString).length;
  return byteSize;
}
