'use client';

import Image from 'next/image';
import Link from 'next/link';

import { Montserrat } from 'next/font/google';
import { cn } from '@/lib/utils';
import { Code, ImageIcon, LayoutDashboard, MessageSquare, Music, Settings, VideoIcon } from 'lucide-react';
const montseratt = Montserrat({ weight: '600', subsets: ['latin'] });

const routes = [
  {
    label: 'Dashboard',
    icon: LayoutDashboard,
    href: '/dashboard',
    color: 'text-sky-500',
  },
  {
    label: 'Conversation',
    icon: MessageSquare,
    href: '/conversation',
    color: 'text-violet-500',
  },
  {
    label: 'Image Generation',
    icon: ImageIcon,
    href: '/image',
    color: 'text-pink-700',
  },
  {
    label: 'Video Generation',
    icon: VideoIcon,
    href: '/video',
    color: 'text-orange-700',
  },
  {
    label: 'Music Generation',
    icon: Music,
    href: '/music',
    color: 'text-emerald-700',
  },
  {
    label: 'Code Generation',
    icon: Code,
    href: '/code',
    color: 'text-green-700',
  },
  {
    label: 'Settings',
    icon: Settings,
    href: '/settings',
  },
];

const Sidebar = () => {
  return (
    <div className="space-y-4 h-full flex flex-col py-2 text-white bg-gray-900">
      <Link href="/dashboard">
        <div className="px-4 mb-14 flex items-center">
          <div className="relative w-8 h-8 mr-2">
            <Image fill alt="logo" src="/logo.png" />
          </div>
          <h1 className={cn('text-2xl font-bold', montseratt.className)}>
            Genius
          </h1>
        </div>
      </Link>
      <div className="space-y-1 px-3">
        {routes.map((route) => {
          return <Link className='p-3 flex items-center justify-start hover:text-white hover:bg-white/10 transition rounded-md' key={route.href} href={route.href}>
            <div className='flex items-center flex-1'>
                <route.icon className={cn('w-7 h-7 mr-2',route.color)}/>
                {route.label}
            </div>
          </Link>;
        })}
      </div>
    </div>
  );
};

export default Sidebar;
