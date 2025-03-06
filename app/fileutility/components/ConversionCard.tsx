import React from 'react';
import Link  from 'next/link';
import { FileConversion } from '@/app/fileutility/file-utils';
import { cn } from '@/lib/utils';
import * as LucideIcons from 'lucide-react';
import { Button } from '@/components/ui/button';

type ConversionCardProps = {
  conversion: FileConversion;
  className?: string;
};

const ConversionCard: React.FC<ConversionCardProps> = ({ conversion, className }) => {
//   const IconComponent = LucideIcons[conversion.icon as keyof typeof LucideIcons] || LucideIcons.File;
const IconName = conversion.icon;
// Only access icon components that actually exist in the library
const Icon = IconName in LucideIcons 
  ? (LucideIcons as any)[IconName] 
  : LucideIcons.File;
  return (
    <div className={cn(
      "relative overflow-hidden rounded-lg border bg-card text-card-foreground shadow transition-all hover:shadow-md",
      className
    )}>
      <div className="p-6 flex flex-col h-full">
        <div className={cn("absolute top-0 right-0 h-24 w-24 -mr-8 -mt-8 rounded-full opacity-10", conversion.color)} />
        
        <div className="flex items-center gap-3 mb-4">
          <div className={cn("p-2 rounded-full", conversion.color)}>
            <Icon className="h-6 w-6 text-white" />
          </div>
          <h3 className="text-xl font-semibold">{conversion.name}</h3>
        </div>
        
        <p className="text-muted-foreground mb-6">{conversion.description}</p>
        
        <div className="mt-auto">
          <Link href={`/fileutility/converter/${conversion.id}`}>
            <Button className="w-full">
              Convert Now
              <LucideIcons.ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ConversionCard;