import Navbar from '@/components/layout/Navbar'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main>
      <div className='h-[7%]'>
        <Navbar />
      </div>
      <div className='h-[93%]'> 
        {children}
      </div>
    </main>        
  )
}
