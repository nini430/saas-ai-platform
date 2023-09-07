'use client';
import * as z from 'zod';
import axios from 'axios';
import { MessageSquare } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import Heading from '@/components/heading';
import { formSchema } from './constants';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { ChatCompletionMessageParam } from 'openai/resources/chat/index.mjs';
import Empty from '@/components/empty';
import Loader from '@/components/loader';
import { cn } from '@/lib/utils';
import UserAvatar from '@/components/user-avatar';
import BotAvatar from '@/components/bot-avatar';

const ConversationPage = () => {
  const [messages, setMessages] = useState<ChatCompletionMessageParam[]>([]);
  const router = useRouter();
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

      const response = await axios.post('/api/conversation', {
        messages: newMessages,
      });
      console.log(response.data);
      setMessages((current) => [...current, userMessage, response.data]);
      form.reset();
    } catch (err) {
      console.log(err);
    } finally {
      router.refresh();
    }
  };
  return (
    <div>
      <Heading
        title="Conversation"
        description="Our Most Advanced Conversation model"
        icon={MessageSquare}
        iconColor="text-violet-500"
        bgColor="bg-violet-500/10"
      />
      <div className="px-4 md:px-8">
        <div>
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
                        className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                        {...field}
                        placeholder="How to calculate the radius of earth?"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button
                disabled={isLoading}
                className="col-span-12 lg:col-span-2 w-full "
              >
                Generate
              </Button>
            </form>
          </Form>
        </div>
        <div className="mt-4 px-4">
          {isLoading && (
            <div className="p-8 flex justify-center items-center">
              <Loader />
            </div>
          )}
          {!isLoading && messages.length === 0 && (
            <Empty label="No conversations started" />
          )}
          <div className="flex flex-col gap-y-4">
            {messages.map((message) => (
              <div
                className={cn(
                  'flex gap-x-3 items-start p-4 rounded-lg border',
                  message.role === 'user'
                    ? 'bg-white border-black/10'
                    : 'bg-muted'
                )}
                key={message.content}
              >
                {message.role==='user' ? <UserAvatar/> : <BotAvatar/>}
               <p className='text-sm'>{message.content}</p> 
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConversationPage;
