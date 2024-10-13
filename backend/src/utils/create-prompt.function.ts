import {
  CompanyDetails,
  CreateBlogDto,
} from 'src/controllers/blog/types/request.types';

import { $Enums } from '@prisma/client';

const LENGTH_TRANSLATIONS: { [key in $Enums.Length]: string } = {
  LONG: '5 paragraphs',
  MEDIUM: '3 paragraphs',
  SHORT: '1 paragraph',
};

export function createPrompt(createBlogData: CreateBlogDto): string {
  const { length, structure, companyDetailsJSON, description } = createBlogData;

  const companyDetailsJSONObject = JSON.parse(
    companyDetailsJSON,
  ) as CompanyDetails;

  const {
    businessName,
    brandIdentity: { mainColors, font },
  } = companyDetailsJSONObject;

  const prompt = `
  Create a blog post for ${businessName} company in a form of html code - output only the html code.

  The blog post should be of ${LENGTH_TRANSLATIONS[length]} length.
  The blog post should be of ${structure} structure.

  The blog post must use accent colors ${mainColors}.
  The blog post must use the ${font} font.
  The blog post must adhere to the below description:

  "${description}"

  More additional data can be found here:
  
  \`\`\`json
  ${companyDetailsJSON}
  \`\`\`
  `;

  return prompt;
}
