import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Info } from 'lucide-react'

export function InfoPopOver ({
    info,
    }: {
    info: string
}){
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost">
            <Info size={24} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        {info}
      </PopoverContent>
    </Popover>
  )
}
