'use client'
import { SessionProvider } from 'next-auth/react'

export default function SessionProviderContext({ children } : any){
    return (
        <SessionProvider>
            {children}
        </SessionProvider>
    )
}