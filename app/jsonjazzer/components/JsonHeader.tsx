
import React from 'react';
import { cn } from '@/lib/utils';

interface JsonHeaderProps {
  className?: string;
}

const JsonHeader: React.FC<JsonHeaderProps> = ({ className }) => {
  return (
    <div className={cn("text-center mb-8 animate-fade-in", className)}>
      <div className="inline-block px-3 py-1 mb-2 text-xs font-medium text-primary-foreground bg-primary rounded-full animate-bounce hover:scale-105 transition-transform">
        Simple • Elegant • Powerful
      </div>
      <h1 className="text-4xl sm:text-5xl font-bold mb-3 tracking-tight animate-slide-in">
        JSON Formatter
      </h1>
      <p className="text-muted-foreground max-w-2xl mx-auto text-base sm:text-lg animate-slide-in-delayed">
        A beautiful tool to format, minify, and validate your JSON with precision and elegance.
      </p>
    </div>
  );
};

export default JsonHeader;
