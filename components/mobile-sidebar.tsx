'use client';

import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import { Sheet, SheetTrigger, SheetContent } from '@/components/ui/sheet';

import Sidebar from '@/components/sidebar';
import { useEffect, useState } from 'react';

const MobileSidebar = () => {
    const [isMounted,setisMounted]=useState(false);

    useEffect(()=>{
        setisMounted(true);
    },[]);

    if(!isMounted) {
        return null;
    }
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="md:hidden" variant="ghost" size="icon">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side='left' className='p-0'>
        <Sidebar/>
      </SheetContent>
    </Sheet>
  );
};

export default MobileSidebar;
