import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

import { BlogPostController } from './controllers/blog/blog-post.controller';
import { OpenAIService } from './services/open-ai/open-ai.service';
import { PrismaService } from './services/prisma/prisma.service';

@Module({
  imports: [HttpModule],
  controllers: [BlogPostController],
  providers: [OpenAIService, PrismaService],
})
export class AppModule {}
