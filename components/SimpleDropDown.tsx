"use client"

import * as React from "react"
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu"
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { ChevronDown } from 'lucide-react'

interface Platform {
  name: string;
  icon: string;
}

interface SimpleDropDownProps {
  platforms: Platform[];
  onChange: (platform: string) => void;
}

export default function SimpleDropDown({ platforms, onChange }: SimpleDropDownProps) {
  const [position, setPosition] = React.useState(platforms[0].name)

  React.useEffect(() => {
    onChange(position);
  }, [position])
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex flex-row gap-2 items-center">
            <ChevronDown/>
            <Image 
            src={(platforms.find((platform) => platform.name === position) || {icon: 'default_icon_path'}).icon} 
            alt={position} 
            width={512} 
            height={512} 
            className="h-4 w-4"  
            />            {position}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Choose platform</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
          {platforms.map(platform => (
            <DropdownMenuRadioItem key={platform.name}  value={platform.name} className="flex flex-row items-center gap-2">
              <Image src={platform.icon} alt={platform.name} width={512} height={512} className="h-4 w-4"  />
              {platform.name}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
