import OpenAi from 'openai';
import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';
import { ChatCompletionMessageParam } from 'openai/resources/chat/completions.mjs';

const openai = new OpenAi({
  apiKey: process.env.OPENAI_SECRET_KEY,
});

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { messages } = body;

    const instructionMessage: ChatCompletionMessageParam = {
      role: 'system',
      content:
        'You are a code generator. You must answer only in markdown code snippets. Use code comments for explanations.',
    };

    if (!userId) {
      return new NextResponse('unauthorized', { status: 401 });
    }

    if (!openai.apiKey) {
      return new NextResponse('api Key not configured', { status: 500 });
    }

    if (!messages) {
      return new NextResponse('Messages required', { status: 400 });
    }

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [instructionMessage, ...messages],
    });

    return NextResponse.json(response.choices[0].message, { status: 200 });
  } catch (err) {
    console.log('[CODE_POST]', err);
    return new NextResponse('Internal error', { status: 500 });
  }
}
