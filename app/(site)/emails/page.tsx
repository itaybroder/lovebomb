"use client"
import Heading from "@/components/layout/PageHeading";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";
import React, { FC, useState } from "react";
import EmailSnippet from "@/components/EmailSnippit";
import FirebaseListener from "@/components/FirebaseListener";
import {  useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
interface IProps {};

const EmailsPage:FC<IProps> = (props) => {
    const router = useRouter();
    const { data: session } = useSession();
    
  const [email, setEmail] = useState('');

  const createEmail = async () => {
    const response = await fetch('api/email', { method: 'POST' });
    const data = await response.json();
    setEmail(`${data.name}@darkcheese.org`);
  };

  return (
    <>
    {session ? (
         <div className="h-full">
      <Heading
        title="Emails"
        description="Create new users and report posts" 
        icon={Mail}
        iconColor="text-pink-500"
        bgColor="bg-pink-100"
        info="Create emails, to then create users to push positive stuff."
      />
      <div className="flex flex-col w-full h-full px-4 lg:px-8">
        <Button className="bg-blue-500 hover:bg-blue-600" onClick={createEmail}>Create Email</Button>
        <div className="mt-4 w-full">
            {email && <EmailSnippet email={email} />}
            <div className="flex flex-col justify-center items-center mt-4">
                {email && <FirebaseListener email={email} />}

            </div>
        </div>

      </div>
    </div>
    ):(
        <div>
            You must be logged in to create emails
        </div>
    )}
       
    </>
    
  )
};

export default EmailsPage;