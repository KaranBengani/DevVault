"use client"
import React, { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { Check, Copy, AlignLeft, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface JsonEditorProps {
  value: string;
  onChange: (value: string) => void;
  isValid: boolean;
  errorMessage?: string;
  className?: string;
  placeholder?: string;
}

const JsonEditor: React.FC<JsonEditorProps> = ({
  value,
  onChange,
  isValid,
  errorMessage,
  className,
  placeholder = "Paste your JSON here..."
}) => {
  const [isCopied, setIsCopied] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleCopy = () => {
    if (value && navigator.clipboard) {
      navigator.clipboard.writeText(value);
      setIsCopied(true);
      toast.success("Copied to clipboard", {
        description: "JSON copied to clipboard successfully"
      });
      
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    }
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  useEffect(() => {
    // Auto-resize textarea as content changes
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [value]);

  return (
    <div
      className={cn(
        "relative rounded-lg border transition-all duration-300 overflow-hidden",
        isValid ? "border-border" : "border-destructive",
        isValid ? "animate-subtle-bounce" : "animate-subtle-shake",
        className
      )}
    >
      <div className="flex items-center justify-between p-3 bg-muted/50 border-b">
        <div className="flex items-center space-x-2">
          {isValid ? (
            <Check size={18} className="text-green-500 animate-fade-in" />
          ) : (
            <X size={18} className="text-destructive animate-pulse" />
          )}
          <span className={cn(
            "text-sm font-medium transition-colors duration-300",
            isValid ? "text-green-500" : "text-destructive"
          )}>
            {isValid ? "Valid JSON" : "Invalid JSON"}
          </span>
        </div>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={handleCopy}
          disabled={!value || !isValid}
          className={cn(
            "h-8 px-2 text-muted-foreground hover:text-foreground transition-all duration-300",
            "hover:scale-105 active:scale-95"
          )}
        >
          {isCopied ? (
            <Check size={16} className="text-green-500 animate-fade-in" />
          ) : (
            <Copy size={16} className="transition-transform hover:rotate-[-8deg]" />
          )}
          <span className="ml-1 text-xs">{isCopied ? "Copied" : "Copy"}</span>
        </Button>
      </div>
      
      <div className="relative">
        <textarea
          ref={textareaRef}
          value={value}
          onChange={handleTextareaChange}
          placeholder={placeholder}
          className={cn(
            "w-full min-h-[200px] p-4 font-mono text-sm resize-none outline-none bg-card",
            "transition-all duration-300 focus:ring-1 focus:ring-ring focus:ring-opacity-50",
            "animate-slide-in",
            isValid ? "" : "bg-destructive/5"
          )}
          spellCheck="false"
        />
      </div>
      
      {!isValid && errorMessage && (
        <div className="p-3 text-sm text-destructive bg-destructive/5 border-t border-destructive/20 animate-slide-in">
          <p className="font-medium">Error: {errorMessage}</p>
        </div>
      )}
    </div>
  );
};

export default JsonEditor;