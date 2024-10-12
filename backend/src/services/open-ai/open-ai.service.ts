import { OpenAI } from 'openai';

import { Injectable } from '@nestjs/common';

import { OpenAIResponse } from './open-ai.model';

@Injectable()
export class OpenAIService {
  private readonly _apiKey: string = process.env['OPEN_AI_API_KEY'];

  private _openai: OpenAI = null;

  constructor() {
    this._openai = new OpenAI({ apiKey: this._apiKey });
  }

  async sendPrompt(prompt: string): Promise<OpenAIResponse> {
    const promptRequest = this._openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content:
            'You are a helpful assistant who generates a single blog post based on provided data and options in a form of a clean, semantic HTML code.',
        },
        {
          role: 'user',
          content: prompt,
        },
        {
          role: 'assistant',
          content: '<html>...</html>',
        },
      ],
    });

    return promptRequest;
  }
}
