import Navbar from '@/components/navbar'
import Sidebar from '@/components/sidebar'

const DashboardLayout = ({children}:{children:React.ReactNode}) => {
  return (
    <div className='relative h-full'>
        <div className='hidden md:flex md:flex-col md:fixed md:h-full md:w-72 bg-gray-900'>
            <Sidebar/>
        </div>
        <main className='h-full md:pl-72'>
            <Navbar/>
            {children}
        </main>
    </div>
  )
}

export default DashboardLayout