import { openai } from '@ai-sdk/openai';
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { convertToModelMessages, streamText, UIMessage } from 'ai';
import { getPersonaPrompt } from '@/utils/getPersonaPrompt';

export const maxDuration = 30;
const google = createGoogleGenerativeAI({
  baseURL: "https://generativelanguage.googleapis.com/v1beta",
  apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY
});

export async function POST(req: Request) {
  const { messages, personaId }: { messages: UIMessage[], personaId: string } = await req.json();
  const system_context = getPersonaPrompt(personaId)

  const result = streamText({
    model: google('gemini-2.5-flash'),
    system: system_context,
    messages: convertToModelMessages(messages),
  });

  return result.toUIMessageStreamResponse();
}