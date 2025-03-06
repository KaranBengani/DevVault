
import React, { useCallback, useState } from 'react';
import { cn } from '@/lib/utils';
import { FileFormat } from '@/app/fileutility/file-utils';
import { Upload, File, AlertCircle } from 'lucide-react';

interface FileDropZoneProps {
  acceptedFormats: FileFormat[];
  onFileDrop: (file: File) => void;
  className?: string;
  maxSize?: number; // in MB
}

const FileDropZone: React.FC<FileDropZoneProps> = ({
  acceptedFormats,
  onFileDrop,
  className,
  maxSize = 10
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const getAcceptString = (): string => {
    const formatMap: Record<FileFormat, string> = {
      pdf: 'application/pdf',
      image: 'image/*',
      doc: '.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      excel: '.xls,.xlsx,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      audio: 'audio/*',
      video: 'video/*',
      txt: 'text/plain',
      csv: 'text/csv'
    };
    
    return acceptedFormats.map(format => formatMap[format]).join(',');
  };
  
  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);
  
  const handleDragLeave = useCallback(() => {
    setIsDragging(false);
  }, []);
  
  const validateFile = (file: File): boolean => {
    // Check file size
    if (file.size > maxSize * 1024 * 1024) {
      setError(`File size exceeds ${maxSize}MB limit`);
      return false;
    }
    
    setError(null);
    return true;
  };
  
  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      if (validateFile(file)) {
        onFileDrop(file);
      }
    }
  }, [onFileDrop, maxSize]);
  
  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      if (validateFile(file)) {
        onFileDrop(file);
      }
    }
  }, [onFileDrop, maxSize]);
  
  return (
    <div
      className={cn(
        "relative border-2 border-dashed rounded-lg p-12 transition-all text-center cursor-pointer hover:bg-muted/50",
        isDragging ? "border-primary bg-primary/5" : "border-muted",
        className
      )}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <input
        type="file"
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        onChange={handleFileChange}
        accept={getAcceptString()}
      />
      
      <div className="flex flex-col items-center justify-center">
        {isDragging ? (
          <>
            <File className="h-16 w-16 text-primary mb-4 animate-bounce-subtle" />
            <h3 className="text-xl font-medium">Drop your file here</h3>
          </>
        ) : (
          <>
            <Upload className="h-16 w-16 text-muted-foreground mb-4" />
            <h3 className="text-xl font-medium mb-2">
              Drag and drop your file here
            </h3>
            <p className="text-muted-foreground">
              or <span className="text-primary">click to select a file</span>
            </p>
            <p className="text-xs text-muted-foreground mt-4">
              Accepted formats: {acceptedFormats.join(', ')} (Max: {maxSize}MB)
            </p>
          </>
        )}
        
        {error && (
          <div className="mt-4 flex items-center text-destructive gap-1 animate-subtle-shake">
            <AlertCircle className="h-4 w-4" />
            <span className="text-sm">{error}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileDropZone;