import { FileConversion } from "./file-utils";

export const fileConversions: FileConversion[] = [
  {
    id: "pdf",
    name: "PDF Converter",
    description: "Convert PDF files to other formats or merge multiple PDFs",
    icon: "file-text",
    color: "bg-red-500",
    conversions: [
      {
        from: "pdf",
        to: ["image", "doc", "txt"]
      }
    ]
  },
  {
    id: "image",
    name: "Image Converter",
    description: "Convert images between formats, resize or compress them",
    icon: "image",
    color: "bg-blue-500",
    conversions: [
      {
        from: "image",
        to: ["pdf", "image"]
      }
    ]
  },
  {
    id: "document",
    name: "Document Converter",
    description: "Convert documents to different formats",
    icon: "file",
    color: "bg-green-500",
    conversions: [
      {
        from: "doc",
        to: ["pdf", "txt"]
      }
    ]
  },
  {
    id: "audio",
    name: "Audio Converter",
    description: "Convert audio files between popular formats",
    icon: "file-audio",
    color: "bg-purple-500",
    conversions: [
      {
        from: "audio",
        to: ["audio"]
      }
    ]
  },
  {
    id: "video",
    name: "Video Converter",
    description: "Convert video files to different formats",
    icon: "file-video",
    color: "bg-yellow-500",
    conversions: [
      {
        from: "video",
        to: ["video", "audio"]
      }
    ]
  },
  {
    id: "spreadsheet",
    name: "Spreadsheet Converter",
    description: "Convert Excel files to CSV or other formats",
    icon: "file",
    color: "bg-emerald-500",
    conversions: [
      {
        from: "excel",
        to: ["csv", "pdf"]
      }
    ]
  }
];

export const getConversionById = (id: string): FileConversion | undefined => {
  return fileConversions.find(conversion => conversion.id === id);
};

export const getAllConversions = (): FileConversion[] => {
  return fileConversions;
};
