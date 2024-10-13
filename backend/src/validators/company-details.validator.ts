import { Ajv } from 'ajv';
import addFormats from 'ajv-formats';
import { registerDecorator, ValidationOptions } from 'class-validator';

import * as companyDetailsSchema from '../utils/company-details.schema.json';

const ajv = new Ajv();
addFormats(ajv);

export function IsValidCompanyDetails(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isValidCompanyDetails',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: string) {
          const validate = ajv.compile(companyDetailsSchema);
          return validate(value);
        },

        defaultMessage() {
          return 'Invalid company details JSON format';
        },
      },
    });
  };
}
