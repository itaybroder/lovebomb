"use client";
import Image from "next/image";
import UserButton from "@/components/UserButton";
import Link from "next/link";
import {useRouter} from "next/navigation";
import { ModeToggle } from "@/components/ModeToggle";
import { Button } from "../ui/button";
import LoginDialog from "../loginModal";
import { signOut, useSession } from "next-auth/react";

const Nav = () => {
  const router = useRouter();
  const { data: session } = useSession();
  return (
    <div className="flex items-center p-4  bg-background w-full sticky top-0 border-2 h-full" >  
        <div className='flex w-full justify-end ' >
            <div className="flex w-full flex-row items-center gap-2">
                <Image src='/logo.png' alt='logo' width={1024} height={1024} className="h-10 w-10 rounded" />
                <h2 className="text-xl font-mono">IronTruth</h2>
            </div>
            <div className="flex justify-end gap-3 w-full" >
              <div className="flex flex-row gap-2 items-center">
                  {
                  session?.user ? (
                      <>
                        <UserButton user={session.user} />
                        <ModeToggle />
                      </>
                  ):(
                    <>
                      <LoginDialog />
                      <ModeToggle />
                    </>
    
                  )
                  }
                  
              </div>
            </div>

        </div>
    </div>
  );
};

export default Nav;
