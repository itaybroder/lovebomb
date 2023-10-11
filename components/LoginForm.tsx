"use client"

import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { signIn } from "next-auth/react"
import { usePathname } from "next/navigation"
export default function LoginForm() {
  const pathname = usePathname()
  const { toast } = useToast()
  const handleGoogleLogin = () => {
      signIn('google', {
            callbackUrl: `${window.location.origin}/${pathname}`,
        })
        .then((callback) => {
            if(callback?.error) {
                toast({
                  title: "Error logging in",
                  variant: 'destructive'
              })
            }
            if(callback?.ok && !callback?.error) {
                toast({
                    title: "Logged in successfully",
                    description: "",
                    variant: 'success'
                })
            }
        })
  }

  return (
    <Card className="border-0 shadow-transparent ">
      <CardHeader className="space-y-1 w-full">
        <CardTitle className="text-2xl">Sign In / Register</CardTitle>
        <CardDescription>
          Use Google to access your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="w-full">
          <Button className="w-full" variant="outline" onClick={handleGoogleLogin}>
            <Icons.google className="mr-2 h-4 w-4" />
            Google
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}