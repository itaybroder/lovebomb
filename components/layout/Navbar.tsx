"use client";

import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import {useRouter} from "next/navigation";
import { ModeToggle } from "@/components/ModeToggle";

const Nav = () => {
  const router = useRouter();
  return (
    <div className="flex items-center p-4 bg-gradient-linear w-full sticky top-0 border-2 h-full" >  
        <div className='flex w-full justify-end ' >
            <div className="flex w-full flex-row items-center gap-2">
                <Image src='/logo.png' alt='logo' width={1024} height={1024} className="h-10 w-10 rounded" />
                <h2 className="text-xl font-mono">IronTruth</h2>
            </div>
            <div className="flex justify-end gap-3 w-full" >
                <ModeToggle />
            </div>

        </div>
    </div>
  );
};

export default Nav;
