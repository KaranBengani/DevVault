import React from 'react';
import Link  from 'next/link';
import { Github, Linkedin, Code } from 'lucide-react';
import { cn } from '@/lib/utils';

interface HeaderProps {
  className?: string;
}

const Header = ({ className }: HeaderProps ) => {
  return (
    <header className={cn("w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60", className)}>
      <div className="container flex h-16 items-center justify-between px-4 mx-auto py-4">
        <div className="flex items-center gap-2">
          <Code className="h-6 w-6 text-primary" />
          <Link href="/" className="text-xl font-bold tracking-tight">
            JSON-Jazzer
          </Link>
        </div>
        
        <nav className="hidden md:flex items-center gap-6 lg:ml-[-90px] xl:ml-[-100px]">
          <Link href="/" className="text-sm font-medium transition-colors hover:text-primary">
            Formatter
          </Link>
          <a href="#" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
            Projects
          </a>
          <a href="#" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
            About
          </a>
          <a href="#" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
            Contact
          </a>
        </nav>
        
        <div className="hidden md:flex items-center gap-4">
          <a 
            href="https://github.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <Github className="h-5 w-5" />
          </a>
          <a 
            href="https://linkedin.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <Linkedin className="h-5 w-5" />
          </a>
        </div>
        
        <button className="inline-flex items-center justify-center md:hidden">
          <span className="sr-only">Open menu</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-menu"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
        </button>
      </div>
    </header>
  );
};

export default Header;
