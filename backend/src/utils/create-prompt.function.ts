import { $Enums } from '@prisma/client';
import { CreateBlogDto } from 'src/controllers/blog/types/request.types';

const LENGTH_TRANSLATIONS: { [key in $Enums.Length]: string } = {
  LONG: '5 paragraphs',
  MEDIUM: '3 paragraphs',
  SHORT: '1 paragraph',
};

export function createPrompt(createBlogData: CreateBlogDto): string {
  const { length, structure, companyDetailsJSON, description } = createBlogData;
  const {
    businessName,
    brandIdentity: { mainColors, font },
  } = companyDetailsJSON;

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
