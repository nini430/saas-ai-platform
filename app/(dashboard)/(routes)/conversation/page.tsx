'use client';
import * as z from 'zod';
import { MessageSquare } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import Heading from '@/components/heading';
import { formSchema } from './constants';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const ConversationPage = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      prompt: '',
    },
    resolver: zodResolver(formSchema),
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
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
                    <Input
                        disabled={isLoading}
                      className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                      {...field}
                      placeholder="How to calculate the radius of earth?"
                    />
                  </FormItem>
                )}
              />
              <Button disabled={isLoading} className='col-span-12 lg:col-span-2 w-full '>Generate</Button>
            </form>
          </Form>
        </div>
        <div className='mt-4 px-4'>
        Messages Content
        </div>
      </div>
    </div>
  );
};

export default ConversationPage;
