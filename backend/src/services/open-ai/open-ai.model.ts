import { OpenAI } from 'openai';

export type OpenAIResponse = OpenAI.Chat.Completions.ChatCompletion & {
  _request_id?: string | null;
};
