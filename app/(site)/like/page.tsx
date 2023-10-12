"use client"
import React, { FC, useState, useEffect } from "react";
import { Heart } from 'lucide-react'
import Heading from "@/components/layout/PageHeading";
import SimpleDropDown from "@/components/SimpleDropDown";
import { TikTokEmbed, InstagramEmbed, TwitterEmbed, YouTubeEmbed, LinkedInEmbed } from 'react-social-media-embed';
import { Button } from "@/components/ui/button";
import confetti from 'canvas-confetti';
import axios from 'axios';
import { Posts } from "@prisma/client";

interface IProps {};

const LikePage:FC<IProps> = (props) => {
    
    // const initialPlatform = localStorage.getItem('platform') || 'tiktok';
    const [platform, setPlatform] = useState("tiktok") 
    const [isExploding, setIsExploding] = React.useState(false);
    const [videos, setVideos] = useState<Posts[]>([]);
    const [currentVideo, setCurrentVideo] = useState(0);
    const [noVideos, setNoVideos] = useState(false);
    const [error, setError] = useState(false);
    
    const platforms = [
        { name: 'Tiktok', icon: '/tiktok.png' },
        { name: 'Instagram', icon: '/instagram.png' },
        { name: 'Youtube', icon: '/youtube.png' },
        { name: 'Facebook', icon: '/facebook.png' },
        { name: 'Linkedin', icon: '/linkedin.png' },
        { name: 'Twitter', icon: '/twitter.png' },
    ];
        async function get5Videos(platform: string) {   
        const options = {
            method: 'GET',
            url: `api/report?platform=${platform}`,
        };

         await axios.request(options)
            .then(async (response) => {
                await response.data;
                if(response.data.length === 0) {
                    setNoVideos(true);
                } else {
                    const validVideos = response.data.filter((video:any) => video?.url);
                    if(validVideos.length === 0) {
                        setError(true);
                    } else {
                        setVideos(validVideos);
                        setCurrentVideo(0);
                        setError(false); 
                    }
                }
            })
            .catch(error => {
                console.error('There was an error!', error);
                setError(true);
            });
    }
    useEffect(() => {
       get5Videos(platform)
    }, [platform]);

    useEffect(() => {
        console.log(videos);
        console.log(currentVideo);
        console.log(videos[currentVideo]);
        console.log(videos[currentVideo]?.url);
    }
    , [videos]);

    const handleNext = () => {
    if(!videos[currentVideo]?.id) {
        get5Videos(platform);
        return;
    }
    axios.post('api/report', { postId: videos[currentVideo]?.id, amount: 1 })
    .then(async (response) => {
        if (currentVideo + 1 >= videos.length) {
            await get5Videos(platform);
            setCurrentVideo(0);
        } else {
            setCurrentVideo(currentVideo + 1);
        }
    })
    .catch(error => {
        console.error('There was an error!', error);
        setError(true);
        return; // Stop the current operation
    });
};
     const handleSkip = () => {
    if(!videos[currentVideo]?.id) {
        get5Videos(platform);
        return;
    }
    axios.post('api/skip', { postId: videos[currentVideo]?.id, amount: 1 })
    .then(async (response) => {
        if (currentVideo + 1 >= videos.length) {
            await get5Videos(platform);
            setCurrentVideo(0);
        } else {
            setCurrentVideo(currentVideo + 1);
        }
    })
    .catch(error => {
        console.error('There was an error!', error);
        setError(true);
        return; // Stop the current operation
    });
};

    const renderEmbed = () => {
        switch(platform) {
            case 'Tiktok':
                return <TikTokEmbed key={videos[currentVideo]?.url} url={videos[currentVideo]?.url ? videos[currentVideo]?.url : ''} width={325} />
            case 'Instagram':
                return <InstagramEmbed key={videos[currentVideo]?.url} url={videos[currentVideo]?.url ? videos[currentVideo]?.url : ''} width={325} />
            case 'Twitter':
                return <TwitterEmbed key={videos[currentVideo]?.url} url={videos[currentVideo]?.url ? videos[currentVideo]?.url : ''} width={325} />
            default:
                return null;
        }
    }

    const handlePlatformChange = (newPlatform: string) => {
        setPlatform(newPlatform);
        localStorage.setItem('platform', newPlatform);
        get5Videos(newPlatform);
    }

    return <div className="mt-4">
        <script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js"></script>
        <Heading
            title="Like"
            description="Like, share and comment on posts that are spreading pro-israeli." 
            icon={Heart}
            iconColor="text-blue-500"
            bgColor="bg-blue-100"
            info="In this page you can report posts that are spreading hate or misinformation.
            Each time you'll be shown an hateful post click on it and report it.
            You can use multiple reports for each post. You can also use our email program to create new users and thus create new reports."
        />
        <div className="px-4 lg-px-8 mb-3">
<SimpleDropDown platforms={platforms} onChange={handlePlatformChange}/>        </div>
        <div className="flex justify-center items-center w-full flex-col">
            {error ? (
                <div className="text-xl px-4">There was an error loading posts. Please try reload the page or try again later.</div>
            ) : noVideos ? (
                <div className="text-xl px-4">You Finished all the videos we have🎉. Maybe switch to a different platform. Try reload the page.</div>
            ) : (
                <>
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
                    {renderEmbed()}        
                </>
            )}
        </div>
      
    </div>
};

export default LikePage;
