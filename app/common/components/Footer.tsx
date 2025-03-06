import React from 'react';
import { Github, Linkedin, Heart } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FooterProps {
  className?: string;
}

const Footer: React.FC<FooterProps> = ({ className }) => {
  return (
    <footer className={cn("w-full border-t bg-background py-6 px-4", className)}>
      <div className="container flex flex-col items-center gap-4 md:flex-row md:justify-between mx-auto">
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <span>Built with</span>
          <Heart className="h-4 w-4 text-destructive" />
          <span>By Karan Bengani</span>
        </div>
        
        <div className="flex items-center gap-4">
          <a 
            href="https://github.com/KaranBengani/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label="GitHub"
          >
            <Github className="h-5 w-5" />
          </a>
          <a 
            href="https://www.linkedin.com/in/karan-bengani/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin className="h-5 w-5" />
          </a>
        </div>
        
        <div className="text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} JSON-Jazzer</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
