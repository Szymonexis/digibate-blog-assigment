import { Transform } from 'class-transformer';
import { IsDefined, IsEnum, IsObject, IsString } from 'class-validator';
import { IsValidCompanyDetails } from 'src/validators/company-details.validator';
import { MaxFileSize } from 'src/validators/max-file-size.validator';

import { $Enums } from '@prisma/client';

const MAX_FILE_SIZE = 4 * 1024 * 1024; // 4 megabytes

export class CreateBlogDto {
  @IsString()
  @IsDefined()
  description: string;

  @IsEnum($Enums.Length)
  @IsDefined()
  length: $Enums.Length;

  @IsEnum($Enums.Structure)
  @IsDefined()
  structure: $Enums.Structure;

  @IsObject()
  @MaxFileSize(MAX_FILE_SIZE)
  @IsValidCompanyDetails()
  @Transform(({ value }) => {
    return typeof value === 'object' ? value : JSON.parse(value);
  })
  companyDetailsJSON: CompanyDetails; // this needs to be a json string (validated with a schema.json located at utils/company-details.schema.json)
}

export interface CompanyDetails {
  companyDescription: string;
  productDescription: string;
  fullBusinessName: string;
  businessName: string;
  industry: string;
  email: string;
  address: string;
  sellPhysicalProducts: string;
  numberOfEmployees: string;
  createdAt: string;
  updatedAt: string;
  brandIdentity: BrandIdentity;
}

export interface BrandIdentity {
  id: string;
  name: string;
  brandAttributes: string[];
  mainColors: string[];
  secondaryColors: string[];
  slogan: string;
  font: string;
  toneOfVoice: string;
  style: string | null;
  colors: string | null;
  productImages: string[] | null;
  description: string | null;
  languageOfContent: string;
  website: string;
  logos: string[];
}
