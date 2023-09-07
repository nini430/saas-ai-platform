'use client';

import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { ArrowRight, MessageSquare, Music,ImageIcon,VideoIcon, Code } from 'lucide-react';
import { useRouter } from 'next/navigation';

const tools = [
  {
    label: 'Conversation',
    icon: MessageSquare,
    href: '/conversation',
    color: 'text-violet-500',
    bgColor: 'bg-violet-500/10',
  },
  {
    label: 'Music Generation',
    icon: Music,
    href: '/music',
    color: 'text-emerald-500',
    bgColor: 'bg-emerald-500/10',
  },
  {
    label: 'Image Generation',
    icon: ImageIcon,
    href: '/image',
    color: 'text-pink-500',
    bgColor: 'bg-pink-500/10',
  },
  {
    label: 'Video Generation',
    icon: VideoIcon,
    href: '/video',
    color: 'text-orange-700',
    bgColor: 'bg-orange-700/10',
  },
  {
    label: 'Code Generation',
    icon: Code,
    href: '/code',
    color: 'text-green-700',
    bgColor: 'bg-green-700/10',
  },
];

export default function DashboardPage() {
  const router=useRouter();
  return (
    <div className="space-y-4">
      <h2 className="text-3xl font-bold text-center">
        Explore the power of AI
      </h2>
      <p className="text-muted-foreground text-center">
        Chat with the smartest AI - Experience the power of AI
      </p>
      <div className="px-4 md:px-7 ">
        {tools.map((tool) => (
          <Card
          onClick={()=>router.push(tool.href)}
            className="p-4 mb-4 flex items-center justify-between hover:shadow-md transition cursor-pointer"
            key={tool.href}
          >
            <div className='flex items-center gap-x-4'>
              <div className={cn('p-2 w-fit rounded-md',tool.bgColor)}>
                <tool.icon className={cn('w-8 h-8',tool.color)}/>
              </div>
              <div className='font-semibold'>
                {tool.label}
              </div>
            </div>
            <ArrowRight className='w-8 h-8'/>
          </Card>
        ))}
      </div>
    </div>
  );
}
