"use client"
import React, { useState, useEffect } from 'react';
import Header from '@/app/common/components/Header';
import Footer from '@/app/common/components/Footer';
import JsonHeader from '@/app/jsonjazzer/components/JsonHeader';
import JsonEditor from '@/app/jsonjazzer/components/JsonEditor';
import ActionButtons from '@/app/jsonjazzer/components/ActionButtons';
import { formatJson, minifyJson, validateJson } from '@/app/utils/json-utils';
import { toast } from 'sonner';

const sampleJson = `{
  "name": "JSON Formatter",
  "version": "1.0.0",
  "description": "A beautiful tool to format, minify, and validate JSON",
  "features": [
    "Format JSON",
    "Minify JSON",
    "Validate JSON",
    "Copy to clipboard"
  ],
  "isAwesome": true
}`;

const JsonFormatter = () => {
  const [jsonInput, setJsonInput] = useState('');
  const [validation, setValidation] = useState({ isValid: true, error: '' });
  const [isProcessing, setIsProcessing] = useState(false);
  
  useEffect(() => {
    // Add small delay to prevent validation on every keystroke
    const timeoutId = setTimeout(() => {
      if (jsonInput) {
        const { isValid, error } = validateJson(jsonInput);
        setValidation({ isValid, error: error || '' });
      } else {
        setValidation({ isValid: true, error: '' });
      }
    }, 300);
    
    return () => clearTimeout(timeoutId);
  }, [jsonInput]);
  
  const handleFormat = () => {
    try {
      setIsProcessing(true);
      // Add a small delay to show the animation
      setTimeout(() => {
        const formatted = formatJson(jsonInput);
        setJsonInput(formatted);
        toast.success("JSON Formatted", {
          description: "Your JSON has been successfully formatted"
        });
        setIsProcessing(false);
      }, 300);
    } catch (error) {
      setIsProcessing(false);
      toast.error("Format Error", {
        description: "There was an error formatting your JSON"
      });
    }
  };
  
  const handleMinify = () => {
    try {
      setIsProcessing(true);
      // Add a small delay to show the animation
      setTimeout(() => {
        const minified = minifyJson(jsonInput);
        setJsonInput(minified);
        toast.success("JSON Minified", {
          description: "Your JSON has been successfully minified"
        });
        setIsProcessing(false);
      }, 300);
    } catch (error) {
      setIsProcessing(false);
      toast.error("Minify Error", {
        description: "There was an error minifying your JSON"
      });
    }
  };
  
  const handleClear = () => {
    setJsonInput('');
    setValidation({ isValid: true, error: '' });
  };
  
  const loadSampleJson = () => {
    setJsonInput(sampleJson);
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <JsonHeader />
        
        <div className="max-w-4xl mx-auto">
          <div className="mb-6 flex justify-end">
            <button 
              onClick={loadSampleJson} 
              className="text-sm text-primary hover:text-primary/80 underline underline-offset-4 transition-colors hover:scale-105 active:scale-95"
            >
              Load Sample
            </button>
          </div>
          
          <div className={`space-y-6 ${isProcessing ? 'animate-pulse opacity-80' : 'animate-slide-in'}`}>
            <JsonEditor 
              value={jsonInput}
              onChange={setJsonInput}
              isValid={validation.isValid}
              errorMessage={validation.error}
              className="shadow-sm transition-all duration-300 hover:shadow-md"
            />
            
            <ActionButtons 
              onFormat={handleFormat}
              onMinify={handleMinify}
              onClear={handleClear}
              isJsonValid={validation.isValid && !!jsonInput.trim()}
            />
          </div>
          
          <div className="mt-8 text-center text-sm text-muted-foreground animate-fade-in">
            <p>Paste your JSON, then format, minify, or validate it.</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default JsonFormatter;
