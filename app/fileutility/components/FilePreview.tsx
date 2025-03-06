import React from 'react';
import { cn } from '@/lib/utils';
import { FileFormat } from '@/app/fileutility/file-utils';
import { Eye, Download, FileText, Image, FileAudio, FileVideo, File } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FilePreviewProps {
  file: File | null;
  previewUrl: string | null;
  targetFormat: FileFormat;
  onDownload: () => void;
  className?: string;
  isConverting: boolean;
}

const FilePreview: React.FC<FilePreviewProps> = ({
  file,
  previewUrl,
  targetFormat,
  onDownload,
  className,
  isConverting
}) => {
  
  if (!file || !previewUrl) return null;
  
  const renderPreview = () => {
    switch (targetFormat) {
      case 'image':
        return (
          <div className="max-h-[500px] overflow-auto rounded-md border bg-muted/50 p-2">
            <img 
              src={previewUrl} 
              alt="Preview" 
              className="max-w-full h-auto mx-auto"
            />
          </div>
        );
      case 'pdf':
        return (
          <div className="h-[500px] overflow-auto rounded-md border bg-muted/50 p-2">
            <iframe 
              src={previewUrl} 
              title="PDF Preview" 
              className="w-full h-full"
            />
          </div>
        );
      case 'audio':
        return (
          <div className="rounded-md border bg-muted/50 p-4">
            <audio controls className="w-full">
              <source src={previewUrl} />
              Your browser does not support the audio element.
            </audio>
          </div>
        );
      case 'video':
        return (
          <div className="rounded-md border bg-muted/50 p-2">
            <video controls className="w-full max-h-[500px]">
              <source src={previewUrl} />
              Your browser does not support the video element.
            </video>
          </div>
        );
      case 'txt':
      case 'csv':
        return (
          <div className="h-[500px] overflow-auto rounded-md border bg-muted/50 p-4 font-mono text-sm">
            <pre>{previewUrl}</pre>
          </div>
        );
      default:
        return (
          <div className="rounded-md border bg-muted/50 p-8 text-center">
            <File className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
            <p>Preview not available for this format</p>
          </div>
        );
    }
  };
  
  const getFileIcon = () => {
    switch (targetFormat) {
      case 'pdf': return <FileText className="h-5 w-5" />;
      case 'image': return <Image className="h-5 w-5" />;
      case 'audio': return <FileAudio className="h-5 w-5" />;
      case 'video': return <FileVideo className="h-5 w-5" />;
      default: return <File className="h-5 w-5" />;
    }
  };
  
  return (
    <div className={cn("space-y-4", className)}>
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Preview</h3>
        <Button
          variant="outline"
          size="sm"
          onClick={onDownload}
          disabled={isConverting}
          className="gap-2"
        >
          {getFileIcon()}
          Download {targetFormat.toUpperCase()}
        </Button>
      </div>
      
      {renderPreview()}
    </div>
  );
};

export default FilePreview;