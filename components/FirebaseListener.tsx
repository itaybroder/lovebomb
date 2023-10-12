"use client"
import React, { useEffect, useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/database';
import "@/components/firebaseConfig";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
interface FirebaseListenerProps {
  email: string;
}

const FirebaseListener: React.FC<FirebaseListenerProps> = ({ email }) => {
    const [lastEmail, setLastEmail] = useState<{ Content: string, Recipient: string, Sender:string, Subject: string } | null>(null);
    useEffect(() => {
        const db = firebase.database();
        let emailPrefix = email.split('@')[0]; 
        let validPath = `mailboxes/${emailPrefix}`;
        const emailRef = db.ref(validPath);
        emailRef.on('value', (snapshot) => {
        setLastEmail(snapshot.val());
        });

        return () => {
        emailRef.off();
        };
    }, [email]);

    return (
        <div>
        {lastEmail ? (
            <div>
                    {/* <p>Content: {lastEmail?.Content}</p>
                    <p>Recipient: {lastEmail?.Recipient}</p>
                    <p>Sender: {lastEmail?.Sender}</p>
                    <p>Subject: {lastEmail?.Subject}</p> */}
                 <Card className="w-[350px]">
                    <CardHeader>
                        <CardTitle>{lastEmail?.Subject}</CardTitle>
                        <CardDescription>Sender: {lastEmail?.Sender}</CardDescription>
                    </CardHeader>
                    {/* <CardContent>
                        
                    </CardContent> */}
                    </Card>
            </div>
            
        ) : (
            'No emails yet'
        )}
    </div>
    );
};

export default FirebaseListener;