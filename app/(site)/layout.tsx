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
  const isMiddle = useMediaQuery({ query: '(max-width: 640px)' })
  return (
    <main>
      <div className='h-[9%] fixed w-full top-0 z-10'>
        
        <Navbar
        isMobile={isMobile}
        />
      </div>
      {isMobile ? 
        <>
          <div className={`h-[calc(91% - 9%)] w-full ${isMiddle ? 'pt-[24%]' : 'pt-[10%]'}`}>
            {children}
          </div>
        </>
      :
        <div className='h-[90%] flex flex-row pt-20'> 
          <div className='w-[20%] h-full fixed left-0 top-[9%] z-10'>
            <Sidebar />
          </div>
          <div className='w-[80%] h-full ml-[20%]'>
            {children}
          </div>
        </div>
      }
    </main>  
  )
}
