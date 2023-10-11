"use client"
import Link from "next/link";
import { ModeToggle } from "@/components/ModeToggle";
import { Button } from "@/components/ui/button";
import { FlameKindling, Heart, LayoutDashboard, Mail, User, Info } from 'lucide-react'
import { useRouter, usePathname } from 'next/navigation'
const Sidebar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const isActive = (route: any) => route === pathname;
  return (
    <div className="flex flex-col items-start p-4 h-full w-full border-x-2 justify-between" >  
        <div className="w-full">
            <Button  className={`w-full mb-2 flex items-center justify-between ${isActive('/report') ? 'bg-red-500' : ''}`} variant='default' onClick={() => router.push('/report')} disabled={isActive('/report')}>
            <FlameKindling size={30} />
            <span className="text-lg mt-1 mr-6 w-full text-center">Report </span>
            </Button>
            <Button   className={`w-full mb-8 flex items-center justify-between  bg-blue-500 hover:bg-blue-600`}      disabled={isActive('/like')} variant='default' onClick={() => router.push('/like')}>
                <Heart size={30} />
                <span className="text-lg mt-1 mr-6 w-full text-center">Like </span>
            </Button>
            <Button   className="w-full mb-2 flex items-center justify-between " variant={isActive('/dashboard') ? 'secondary' : 'outline'} onClick={() => router.push('/dashboard')}>
                <LayoutDashboard size={30} />
                <span className="text-lg mt-1 mr-6 w-full text-center">Dashboard </span>
            </Button>
            <Button   className="w-full mb-2 flex items-center justify-between " variant={isActive('/emails') ? 'secondary' : 'outline'} onClick={() => router.push('/emails')}>
                <Mail size={30} />
                <span className="text-lg mt-1 mr-6 w-full text-center">Emails </span>
            </Button>
        </div>
        <div className="w-full">
            <Button   className="w-full mb-2 flex items-center justify-between font-mono" variant={isActive('/profile') ? 'secondary' : 'outline'} onClick={() => router.push('/profile')}>
                <Info size={30} />
                <span className="text-lg mt-1 mr-6 w-full text-center">About </span>
            </Button>
        </div>
    </div>
  );
};

export default Sidebar; 