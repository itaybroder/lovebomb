"use client"
import React, { FC, useState } from "react";
import { FlameKindling } from 'lucide-react'
import Heading from "@/components/layout/PageHeading";
import SimpleDropDown from "@/components/SimpleDropDown";
interface IProps {};

const ReportPage:FC<IProps> = (props) => {
    const [platform, setPlatform] = useState('tiktok') 

    const platforms = [
        { name: 'Tiktok', icon: '/tik-tok.png' },
        { name: 'Instagram', icon: '/instagram.png' },
        { name: 'Twitter (X)', icon: '/twitter.png' },
    ];
    return <div className="mt-4">
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
        <div className="px-4 lg-px-8">
            <SimpleDropDown platforms={platforms}/>

        </div>
      
    </div>
};

export default ReportPage;