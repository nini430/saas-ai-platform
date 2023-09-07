import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';
import OpenAi from 'openai';

const openai = new OpenAi({
  apiKey: process.env.OPENAI_SECRET_KEY,
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { messages } = body;
    const { userId } = auth();

    if (!userId) {
      return new NextResponse('unauthorized', { status: 401 });
    }

    if (!openai.apiKey) {
      return new NextResponse('api key not configured', { status: 500 });
    }

    if (!messages) {
      return new NextResponse('messages are required', { status: 400 });
    }

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages,
    });

    return NextResponse.json(response.choices[0].message);
  } catch (err) {
    console.log('[CONVERSATION_POST]', err);
    return new NextResponse('Internal error', { status: 500 });
  }
}
