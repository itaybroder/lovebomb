"use client";

import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

export default function UserButton ({ user }: {user:any}) {
  return (
    <DropdownMenu>
            <DropdownMenuTrigger asChild>
              {user.image ? (
                <Image
                  src={user.image}
                  width={37}
                  height={37}
                  className='rounded-full'
                  alt='profile'
                />
              ) : (
                <Image
                  src="https://cdn.discordapp.com/attachments/1135416632659939350/1147479293916614656/itaybrodera_Design_a_logo_for_an_app_named_Cognition._Im_visual_c9679c52-df2b-4f3d-bf32-20022b1a8c80.png"
                  width={37}
                  height={37}
                  className='rounded-full'
                  alt='profile'
                />
              )}
            </DropdownMenuTrigger>
            <DropdownMenuContent className='w-56'>
              <DropdownMenuItem>
                <Link href='/profile'>
                  Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <button type='button' onClick={()=>{signOut({callbackUrl: `${window.location.origin}/login`})}}>
                  Sign Out
                </button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
  )
}