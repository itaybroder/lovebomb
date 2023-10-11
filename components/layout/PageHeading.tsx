import { Camera } from "lucide-react";

import { cn } from "@/lib/utils";
import { InfoPopOver } from "../InfoPopOver";

interface HeadingProps {
  title: string;
  description: string;
  icon: typeof Camera;
  iconColor?: string;
  bgColor?: string;
  info?: string;
}

const Heading = ({
  title,
  description,
  icon: Icon,
  iconColor,
  bgColor,
  info
}: HeadingProps) => {
  return (
    <>
      <div className="px-4 lg:px-8 flex items-center gap-x-3 mb-3 w-full">
        <div className={cn("p-2 w-fit rounded-md", bgColor)}>
          <Icon className={cn("w-10 h-10", iconColor)} />
        </div>
        {info ? (
              <div className="w-full">
                <div className="w-full flex flex-row justify-between">
                    <h2 className="text-3xl font-bold">{title}</h2>
                    <InfoPopOver info={info} />
                </div>
                <p className="text-sm text-muted-foreground">
                  {description}
                </p>
          </div>
        ):(
          <div>
          <h2 className="text-3xl font-bold">{title}</h2>
            <p className="text-sm text-muted-foreground">
              {description}
            </p>
          </div>
        )}
        
      </div>
    </>
  );
};

export default Heading;