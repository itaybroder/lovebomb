"use client"
import Link from "next/link";
import { ModeToggle } from "@/components/ModeToggle";
import { Button } from "@/components/ui/button";

const Sidebar = () => {
  return (
    <div className="flex flex-col items-start p-4 h-full w-full border-x-2" >  
        <Button className="w-full mb-8">
            New Email
        </Button>
        <h1 className="text-xl mb-3">Recent Emails List</h1>
        <Button variant='outline' className="w-full">
            itay@fuckhamas.com
        </Button>
        <Button variant='outline' className="mt-4 w-full">
            itay@fuckhamas.com
        </Button>
        <Button variant='outline' className="mt-4 w-full">
            itay@fuckhamas.com
        </Button>
    </div>
  );
};

export default Sidebar; 