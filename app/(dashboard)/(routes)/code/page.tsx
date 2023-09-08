'use client';
import * as z from 'zod';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import ReactMarkDown from 'react-markdown'

import Heading from '@/components/heading';
import { ChatCompletionMessageParam } from 'openai/resources/chat/completions.mjs';
import { Code } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { formSchema } from '../conversation/constants';
import { useRouter } from 'next/navigation';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Empty from '@/components/empty';
import Loader from '@/components/loader';
import { cn } from '@/lib/utils';
import UserAvatar from '@/components/user-avatar';
import BotAvatar from '@/components/bot-avatar';


const CodePage = () => {
  const router = useRouter();
  const [messages, setMessages] = useState<ChatCompletionMessageParam[]>([]);
  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      prompt: '',
    },
    resolver: zodResolver(formSchema),
  });
  const isLoading = form.formState.isSubmitting;
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const userMessage: ChatCompletionMessageParam = {
        role: 'user',
        content: values.prompt,
      };

      const newMessages = [...messages, userMessage];
      const response = await axios.post('/api/code', { messages: newMessages });
      setMessages((current) => [...current, userMessage, response.data]);
      form.reset();
    } catch (err) {
    } finally {
      router.refresh();
    }
  };
  return (
    <div className="relative">
      <Heading
        title="Code Generation"
        description="Generate code using descriptive text"
        icon={Code}
        iconColor="text-green-700"
        bgColor="bg-green-700/10"
      />
      <div className="px:4 md:px-8">
        <Form {...form}>
          <form
            className="p-4 rounded-lg border grid grid-cols-12"
            noValidate
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              name="prompt"
              control={form.control}
              render={({ field }) => (
                <FormItem className="col-span-12 lg:col-span-10">
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder="Simple toggle button with react hooks"
                      className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button
              disabled={isLoading}
              className="col-span-12 lg:col-span-2 w-full"
            >
              Generate
            </Button>
          </form>
        </Form>
        <div className="mt-4 p-8">
          {isLoading && <Loader />}
          {messages.length === 0 && <Empty label="" />}

          <div className="flex flex-col gap-y-4">
            {messages.map((message) => (
              <div
                className={cn(
                  'flex gap-x-4 items-start p-4 border rounded-lg',
                  message.role === 'user' ? 'bg-white' : 'bg-muted'
                )}
                key={message.content}
              >
                {message.role === 'user' ? <UserAvatar /> : <BotAvatar />}
                <ReactMarkDown
                  className='overflow-hidden'
                  components={{
                    pre:({node,...props})=>(
                      <div className='p-2 bg-black/10 my-2 text-sm rounded-lg overflow-auto w-full'>
                        <pre {...props} />
                      </div>
                    ),
                    code:({node,...props})=>(
                        <code className='p-1 bg-black/10 rounded-lg' {...props} />
                    ),
                  
                  }}
                >{message.content || ''}</ReactMarkDown>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodePage;
