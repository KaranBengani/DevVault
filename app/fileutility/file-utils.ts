export type FileFormat = 
  | 'pdf' 
  | 'image' 
  | 'doc' 
  | 'excel' 
  | 'audio' 
  | 'video'
  | 'txt'
  | 'csv';

export type ConversionType = {
  id: string;
  title: string;
  description: string;
  sourceFormat: FileFormat;
  targetFormat: FileFormat;
  icon: string;
  color: string;
};

export type Conversion = {
  from: FileFormat;
  to: FileFormat[];
};

export type FileConversion = {
  id: string;
  name: string;
  description: string;
  conversions: Conversion[];
  icon: string;
  color: string;
};
