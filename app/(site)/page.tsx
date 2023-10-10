import Image from 'next/image'
import { ModeToggle } from '@/components/ModeToggle'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
export default function Home() {
  return (
    <div className='flex flex-col items-center h-full w-full'>
      <div className='mt-12'>
          <h1 className='text-3xl '>Connect Your blah here</h1>
      </div>
        <div>
            <Input placeholder='sessionId'  />

            <Button>emil</Button>
        </div>
    </div>
  )
}
