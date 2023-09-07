import { cn } from '@/lib/utils';
import {LucideIcon} from 'lucide-react'

interface HeadingProps {
    title:string;
    description:string;
    icon:LucideIcon;
    iconColor?:string;
    bgColor:string;
}

const Heading = ({title,description,icon:Icon,iconColor,bgColor}:HeadingProps) => {
  return (
    <div className='px-4 flex items-center mb-8 gap-x-3'>
    <div className={cn('rounded-md p-2',bgColor)}>
        {<Icon className={cn('w-10 h-10',iconColor)}/>}
    </div>
        <div >
            <h2 className='text-2xl font-bold'>{title}</h2>
            <p className='text-muted-foreground text-sm'>{description}</p>
        </div>
    </div>
  )
}

export default Heading