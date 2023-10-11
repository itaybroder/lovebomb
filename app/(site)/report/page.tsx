"use client"
import React, { FC, useState, useEffect } from "react";
import { FlameKindling } from 'lucide-react'
import Heading from "@/components/layout/PageHeading";
import SimpleDropDown from "@/components/SimpleDropDown";
import { TikTokEmbed } from 'react-social-media-embed';
import { Button } from "@/components/ui/button";
import confetti from 'canvas-confetti';
import axios from 'axios';
import { Posts } from "@prisma/client";
interface IProps {};

const ReportPage:FC<IProps> = (props) => {
    const [platform, setPlatform] = useState('tiktok') 
    const [isExploding, setIsExploding] = React.useState(false);
    const [videos, setVideos] = useState<Posts[]>([]);
    const [currentVideo, setCurrentVideo] = useState(0);

    const platforms = [
        { name: 'Tiktok', icon: '/tiktok.png' },
        { name: 'Instagram', icon: '/instagram.png' },
        { name: 'Twitter (X)', icon: '/twitter.png' },
    ];
    function get5Videos() {
         axios.get('api/report')
            .then(async (response) => {
                await response.data;
                setVideos(response.data);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }
    useEffect(() => {
       get5Videos()
    }, []);

    useEffect(() => {
        console.log(videos);
        console.log(currentVideo);
        console.log(videos[currentVideo]);
        console.log(videos[currentVideo]?.url);
        
    }
    , [videos]);

    const handleNext = () => {
        axios.post('api/report', { postId: videos[currentVideo]?.id, amount: 1 })
            .then(async (response) => {
                setCurrentVideo(currentVideo + 1);
                if (currentVideo >= videos.length) {
                    await get5Videos();
                    setCurrentVideo(0);
                }
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    };

    const handleSkip = () => {
        axios.post('api/skip')
            .then(response => {
                setCurrentVideo(currentVideo + 1);
                if (currentVideo >= videos.length) {
                    setVideos(response.data);
                    setCurrentVideo(0);
                }
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    };
    

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
                <Button variant='outline' style={{width: '100%'}} onClick={handleSkip}>skip 👀</Button>
            <Button 
                variant="default" 
                style={{width: '100%'}} 
                onClick={(event) => {
                    handleNext();
                    const rect = event.currentTarget.getBoundingClientRect();
                    confetti({
                        particleCount: 300,
                        startVelocity: 30,
                        spread: 360,
                        origin: {
                            x: (rect.x + rect.width / 2) / window.innerWidth,
                            y: (rect.y + rect.height / 2) / window.innerHeight
                        }
                    });
                }}
            >
                next one 🔥
            </Button>     
           </div>
           {/* <div className="absolute z-50 top-20 left-2">
            <img src="flame.gif" alt="" className="w-32 h-auto" />
           </div> */}
        <TikTokEmbed key={videos[currentVideo]?.url} url={videos[currentVideo]?.url ? videos[currentVideo]?.url : ''} width={325} />        </div>
      
    </div>
};

export default ReportPage;