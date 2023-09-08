'use client';
import * as z from 'zod';
import axios from 'axios';
import { Music, VideoIcon } from 'lucide-react';
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

const VideoPage = () => {
  const [video, setVideo] = useState(undefined);
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      prompt: '',
    },
    resolver: zodResolver(formSchema),
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setVideo(undefined);
    try {
      const response = await axios.post('/api/video', values);
      console.log(response.data);
      setVideo(response.data[0]);
    } catch (err) {
      console.log(err);
    } finally {
      router.refresh();
    }
  };
  return (
    <div>
      <Heading
        title="Video Generation"
        description="Our Most Advanced Video model"
        icon={VideoIcon}
        iconColor="text-orange-700"
        bgColor="bg-orange-700/10"
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
                        placeholder="redhead singer singing a beautiful song"
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

          {!isLoading && !video && (
            <Empty label='No Video generated '/>
          )}

          {video && (
            <video controls className='mt-8'>
                <source src={video} />
            </video>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoPage;
