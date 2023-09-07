import Image from 'next/image'

interface EmptyProps {
    label:string;
}

const Empty = ({label}:EmptyProps) => {
  return (
    <div className="flex flex-col items-center justify-center gap-y-3 p-20">
        <div className="relative w-72 h-72">
          <Image fill alt='empty' src={'/empty.png'} /> 
        </div>
        <p className='text-muted-foreground'>{label}</p>
    </div>
  )
}

export default Empty