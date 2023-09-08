'use client';

import axios from 'axios';
import * as z from 'zod';
import Image from 'next/image'
import { zodResolver } from '@hookform/resolvers/zod';
import Heading from '@/components/heading';
import { Download, ImageIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { formSchema, amountOptions, resolutionOptions } from './constants';
import { useState } from 'react';
import Loader from '@/components/loader';
import Empty from '@/components/empty';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardFooter } from '@/components/ui/card';

const ImagePage = () => {
  const router = useRouter();
  const [images, setImages] = useState<string[]>([]);
  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      amount: '1',
      resolution: '512x512',
      prompt: '',
    },
    resolver: zodResolver(formSchema),
  });
  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setImages([]);
    try {
      const response = await axios.post('/api/image', values);
      const urls = response.data.map(
        (image: { url: string }) => image.url
      ) as string[];
      setImages(urls);
      form.reset();
    } catch (err) {
      console.log(err);
    } finally {
      router.refresh();
    }
  };
  return (
    <div className="relative">
      <Heading
        title="Image Generation"
        description="Turn your prompt into an image"
        icon={ImageIcon}
        iconColor="text-pink-700"
        bgColor="bg-pink-700/10"
      />

      <div className="px-4 md:px-8">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="border p-4 rounded-lg grid grid-cols-12 gap-1"
            noValidate
          >
            <FormField
              name="prompt"
              control={form.control}
              render={({ field }) => (
                <FormItem className="col-span-12 lg:col-span-6">
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                      {...field}
                      placeholder="A horse in a red umbrella"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name="amount"
              control={form.control}
              render={({ field }) => (
                <FormItem className="col-span-12 lg:col-span-2">
                  <Select
                    disabled={isLoading}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue defaultValue={field.value} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {amountOptions.map((item) => (
                        <SelectItem key={item.value} value={item.value}>
                          {item.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <FormField
              name="resolution"
              control={form.control}
              render={({ field }) => (
                <FormItem className="col-span-12 lg:col-span-2">
                  <Select
                    disabled={isLoading}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue defaultValue={field.value} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {resolutionOptions.map((resolution) => (
                        <SelectItem
                          key={resolution.value}
                          value={resolution.value}
                        >
                          {resolution.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <Button disabled={isLoading} className="col-span-12 lg:col-span-2">
              Generate
            </Button>
          </form>
        </Form>
        {isLoading && (
          <div className="p-20">
            <Loader />
          </div>
        )}

        {images.length === 0 && !isLoading && (
          <div className="p-10">
            <Empty label="No Images Generated" />
          </div>
        )}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-8'>
          {images.map(src=>(
            <Card key={src} className='overflow-hidden relative flex flex-col items-center gap-y-3 p-1'>
              <div className='relative w-72 h-72'>
              <Image src={src} fill alt='some logo' />
              </div>
                
                <CardFooter>
                  <Button onClick={()=>window.open(src)} className='w-full'>
                    <Download className='w-5 h-5 mr-2'/>
                    Download
                  </Button>
                </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImagePage;
