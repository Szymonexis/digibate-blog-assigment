import { PrismaService } from 'src/services/prisma/prisma.service';

import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { BlogPost, BlogPostData, Prisma } from '@prisma/client';

import { OpenAIService } from 'src/services/open-ai/open-ai.service';
import { createPrompt } from 'src/utils/create-prompt.function';
import { CreateBlogDto } from './types/request.types';
import { OpenAIResponse } from 'src/services/open-ai/open-ai.model';

import * as mockedOpenAIResponse from '../../../mock/response.json';

@Controller({
  path: 'blog-post',
})
export class BlogPostController {
  constructor(
    private readonly _prismaService: PrismaService,
    private readonly _openAIService: OpenAIService,
  ) {}

  @Get('all')
  async getBlogs(): Promise<BlogPost[]> {
    return this._prismaService.blogPost.findMany();
  }

  @Get(':id')
  async getBlog(
    @Param('id') id: string,
  ): Promise<BlogPostData & { blogPost: BlogPost }> {
    return this._prismaService.blogPostData.findFirst({
      where: { blogPostId: id },
      include: { blogPost: true },
    });
  }

  @Post()
  async createBlog(
    @Body() createBlogData: CreateBlogDto,
  ): Promise<BlogPostData & { blogPost: BlogPost }> {
    const { companyDetailsJSON, description, length, structure } =
      createBlogData;

    // set mock to false in order to go fully live
    const mock = true;
    let blogPostOpenAIResponse: OpenAIResponse;

    if (!mock) {
      const prompt = createPrompt(createBlogData);
      blogPostOpenAIResponse = await this._openAIService.sendPrompt(prompt);
    } else {
      blogPostOpenAIResponse =
        mockedOpenAIResponse as unknown as OpenAIResponse;

      await sleep(5000);
    }

    const markdownHtml = blogPostOpenAIResponse.choices[0].message.content;
    const pureHtml = markdownHtml
      .replace(/(```(html)?)/g, '')
      .replace(/\\n/g, '\n')
      .replace(/\\"/g, '"')
      .trim();

    const blogPost = await this._prismaService.blogPost.create({
      data: {
        html: pureHtml,
      },
    });

    await this._prismaService.blogPostData.create({
      data: {
        companyDetailsJSON: companyDetailsJSON as unknown as Prisma.JsonObject,
        length,
        structure,
        description,
        blogPostId: blogPost.id,
      },
    });

    const blogPostData = this._prismaService.blogPostData.findFirst({
      where: { blogPostId: blogPost.id },
      include: { blogPost: true },
    });

    return blogPostData;
  }
}

// for mock purposes
function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
