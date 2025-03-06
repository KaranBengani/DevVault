
'use client';

import React, { useState, useEffect, use } from 'react';
import Header from '@/app/common/components/Header';
import Footer from '@/app/common/components/Footer';
import FileDropZone from '@/app/fileutility/components/FileDropZone';
import FilePreview from '@/app/fileutility/components/FilePreview';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { getConversionById } from '@/app/fileutility/conversion-types';
import { FileFormat } from '@/app/fileutility/file-utils';
import { ArrowLeft, RefreshCw, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import Link from 'next/link';

interface FileConverterProps {
  params:Promise< {
    id: string,
  }>;
}

export default function FileConverter({ params }: FileConverterProps) {
  const { id } = use(params);
  const conversion = getConversionById(id || '');
  
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [targetFormat, setTargetFormat] = useState<FileFormat | ''>('');
  const [isConverting, setIsConverting] = useState(false);
  
  useEffect(() => {
    // Reset when conversion type changes
    setFile(null);
    setPreviewUrl(null);
    setTargetFormat('');
    
    // Set default target format if available
    if (conversion?.conversions[0]?.to.length) {
      setTargetFormat(conversion.conversions[0].to[0]);
    }
  }, [id, conversion]);
  
  // Clean up URLs on unmount
  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);
  
  const handleFileDrop = (droppedFile: File) => {
    if (file) {
      URL.revokeObjectURL(previewUrl || '');
    }
    
    setFile(droppedFile);
    
    // Create preview for supported formats
    const url = URL.createObjectURL(droppedFile);
    setPreviewUrl(url);
  };
  
  const handleConvert = () => {
    if (!file || !targetFormat) return;
    
    setIsConverting(true);
    
    // Simulate conversion process with a timeout
    setTimeout(() => {
      setIsConverting(false);
      toast.success("Conversion Complete", {
        description: `Your file has been converted to ${targetFormat.toUpperCase()} format.`
      });
    }, 2000);
  };
  
  const handleDownload = () => {
    if (!previewUrl || !file) return;
    
    // Create a temporary link and trigger download
    const link = document.createElement('a');
    link.href = previewUrl;
    link.download = `converted-file.${targetFormat}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast.success("Download Started", {
      description: "Your file is downloading..."
    });
  };
  
  const handleReset = () => {
    if (file && previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setFile(null);
    setPreviewUrl(null);
  };
  
  if (!conversion) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-12 text-center">
          <h1 className="text-3xl font-bold mb-4">Conversion Not Found</h1>
          <p className="text-muted-foreground mb-8">
            The conversion type you are looking for doesn't exist.
          </p>
          <Link href="/fileutility">
            <Button>Go Back Home</Button>
          </Link>
        </main>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link href="/fileutility" className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </div>
        
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">{conversion.name}</h1>
          <p className="text-muted-foreground max-w-2xl">{conversion.description}</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-medium">Upload File</h2>
              
              {file && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={handleReset}
                  className="text-muted-foreground"
                >
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Reset
                </Button>
              )}
            </div>
            
            {!file ? (
              <FileDropZone 
                acceptedFormats={[conversion.conversions[0].from]} 
                onFileDrop={handleFileDrop}
              />
            ) : (
              <div className="border rounded-lg p-4 bg-muted/20">
                <div className="flex items-center">
                  <div className="p-2 rounded-full bg-primary/10 mr-4">
                    <RefreshCw className="h-5 w-5 text-primary" />
                  </div>
                  <div className="overflow-hidden">
                    <p className="font-medium truncate">{file.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>
                
                <div className="mt-6 space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="format" className="block text-sm font-medium">
                      Target Format
                    </label>
                    <Select
                      value={targetFormat}
                      onValueChange={(value) => setTargetFormat(value as FileFormat)}
                    >
                      <SelectTrigger id="format">
                        <SelectValue placeholder="Select format" />
                      </SelectTrigger>
                      <SelectContent>
                        {conversion.conversions[0].to.map((format) => (
                          <SelectItem key={format} value={format}>
                            {format.toUpperCase()}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <Button 
                    className="w-full"
                    onClick={handleConvert}
                    disabled={isConverting || !targetFormat}
                  >
                    {isConverting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Converting...
                      </>
                    ) : (
                      'Convert Now'
                    )}
                  </Button>
                </div>
              </div>
            )}
          </div>
          
          <div>
            {previewUrl && (
              <FilePreview
                file={file}
                previewUrl={previewUrl}
                targetFormat={targetFormat as FileFormat}
                onDownload={handleDownload}
                isConverting={isConverting}
              />
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}