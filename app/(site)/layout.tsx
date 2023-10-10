'use client'
import Navbar from '@/components/layout/Navbar'
import Sidebar from '@/components/layout/Sidebar'
import MobileSidebar from '@/components/layout/MobileSidebar'
import { useMediaQuery } from 'react-responsive' 

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const isMobile = useMediaQuery({ query: '(max-width: 1000px)' })
  return (
    <main>
      <div className='h-[9%]'>
        <Navbar />
      </div>
      {isMobile ? 
        <>
          <MobileSidebar />
          <div className='h-[calc(91% - 9%)] w-full'>
            {children}
          </div>
        </>
      :
        <div className='h-[90%] flex flex-row'> 
          <div className='w-[20%] h-full'>
            <Sidebar />
          </div>
          <div className='w-[80%] h-full'>
            {children}
          </div>
        </div>
      }
    </main>  
  )
}
