import { ThemeProvider } from '@/components/theme-provider'
import './globals.css'
import type { Metadata } from 'next'
import { Toaster } from "@/components/ui/toaster"
import  SessionProviderContext  from "@/app/context/AuthContext"
export const metadata: Metadata = {
  title: 'Love Bomb',
  description: 'A website for the bombing the media.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
        <head />
        <body>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <SessionProviderContext>
                {children}
            </SessionProviderContext>
            <Toaster />
          </ThemeProvider>
        </body>
      </html>
  )
}
