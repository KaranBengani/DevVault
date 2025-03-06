import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { AlignLeft, AlignJustify, Trash } from 'lucide-react';

interface ActionButtonsProps {
  onFormat: () => void;
  onMinify: () => void;
  onClear: () => void;
  className?: string;
  isJsonValid: boolean;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
  onFormat,
  onMinify,
  onClear,
  className,
  isJsonValid
}) => {
  return (
    <div className={cn("flex flex-wrap gap-3 animate-fade-in", className)}>
      <Button
        onClick={onFormat}
        disabled={!isJsonValid}
        className={cn(
          "flex-1 min-w-[120px] bg-primary hover:bg-primary/90 transition-all duration-300 shadow-sm",
          "hover:translate-y-[-2px] hover:shadow-md active:translate-y-0 active:scale-95",
          "disabled:translate-y-0 disabled:shadow-sm"
        )}
      >
        <AlignLeft size={16} className="mr-2 transition-transform group-hover:rotate-3" />
        Format
      </Button>
      
      <Button
        onClick={onMinify}
        disabled={!isJsonValid}
        className={cn(
          "flex-1 min-w-[120px] bg-primary/90 hover:bg-primary transition-all duration-300 shadow-sm",
          "hover:translate-y-[-2px] hover:shadow-md active:translate-y-0 active:scale-95",
          "disabled:translate-y-0 disabled:shadow-sm"
        )}
      >
        <AlignJustify size={16} className="mr-2 transition-transform group-hover:rotate-3" />
        Minify
      </Button>
      
      <Button
        onClick={onClear}
        variant="outline"
        className={cn(
          "flex-1 min-w-[120px] hover:bg-muted/50 transition-all duration-300",
          "hover:text-destructive hover:border-destructive active:scale-95"
        )}
      >
        <Trash size={16} className="mr-2 transition-transform group-hover:rotate-12" />
        Clear
      </Button>
    </div>
  );
};

export default ActionButtons;