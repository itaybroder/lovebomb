"use client"
import React, { FC, useState } from "react";
import { FlameKindling } from 'lucide-react'
import Heading from "@/components/layout/PageHeading";
import SimpleDropDown from "@/components/SimpleDropDown";
import { TikTokEmbed } from 'react-social-media-embed';
import { Button } from "@/components/ui/button";
import confetti from 'canvas-confetti';

interface IProps {};

const ReportPage:FC<IProps> = (props) => {
    const [platform, setPlatform] = useState('tiktok') 
    const [isExploding, setIsExploding] = React.useState(false);
    const platforms = [
        { name: 'Tiktok', icon: '/tiktok.png' },
        { name: 'Instagram', icon: '/instagram.png' },
        { name: 'Twitter (X)', icon: '/twitter.png' },
    ];
    return <div className="mt-4">
        <script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js"></script>
        <Heading
            title="Report"
            description="Stop the spread of hate and misinformation." 
            icon={FlameKindling}
            iconColor="text-red-500"
            bgColor="bg-red-100"
            info="In this page you can report posts that are spreading hate or misinformation.
            Each time you'll be shown an hateful post click on it and report it.
            You can use multiple reports for each post. You can also use our email program to create new users and thus create new reports."
        />
        <div className="px-4 lg-px-8 mb-3">
            <SimpleDropDown platforms={platforms}/>
        </div>
        <div className="flex justify-center items-center w-full flex-col">
            <div className="flex flex-row justify-between w-auto gap-12 mb-2" style={{width: '325px'}}>
                <Button variant='outline' style={{width: '100%'}}>skip 👀</Button>
            <Button 
                variant="default" 
                style={{width: '100%'}} 
                onClick={(event) => {
                    
                    const rect = event.currentTarget.getBoundingClientRect();
                    confetti({
                        particleCount: 100,
                        startVelocity: 30,
                        spread: 360,
                        origin: {
                            x: (rect.x + rect.width / 2) / window.innerWidth,
                            y: (rect.y + rect.height / 2) / window.innerHeight
                        }
                    });
                    const gunshot = new Audio('/gunshot.mp3');
                    gunshot.play();
                    gunshot.onended = function() {
                        gunshot.remove();
                    };
                }}
            >
                next 🔥
            </Button>     
           </div>
            <TikTokEmbed url="https://www.tiktok.com/@epicgardening/video/7055411162212633903" width={325} />
        </div>
      
    </div>
};

export default ReportPage;