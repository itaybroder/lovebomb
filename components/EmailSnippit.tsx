// components/EmailSnippet.tsx
import React from 'react';
import { Clipboard } from 'lucide-react';
import 'tailwindcss/tailwind.css'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface EmailSnippetProps {
  email: string;
}

const EmailSnippet: React.FC<EmailSnippetProps> = ({ email }) => {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(email);
  };

  return (
    <TooltipProvider>
    <Tooltip>
        <TooltipTrigger>
            <div className="p-4 border rounded-md shadow-sm flex justify-between items-center cursor-pointer"  onClick={copyToClipboard}>
                <span>{email}</span>
                <button className="ml-2">
                    <Clipboard className="text-gray-500 hover:text-gray-700" />
                </button>
                </div>
        </TooltipTrigger>
        <TooltipContent>
        <p>copy</p>
        </TooltipContent>
    </Tooltip>
    </TooltipProvider>
    
  );
};

export default EmailSnippet;