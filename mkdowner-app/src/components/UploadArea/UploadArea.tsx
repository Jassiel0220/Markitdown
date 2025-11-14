import { useState, useRef } from 'react';
import './UploadArea.css';

interface UploadAreaProps {
  onFilesSelected: (files: FileList) => void;
  onSubmit: (files: FileList) => void;
  isUploading: boolean;
  progress: number;
  selectedFiles: File[];
}

export const UploadArea = ({ onFilesSelected, onSubmit, isUploading, progress, selectedFiles }: UploadAreaProps) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files) {
      onFilesSelected(e.dataTransfer.files);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      onFilesSelected(e.target.files);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedFiles.length > 0) {
      const fileList = new DataTransfer();
      selectedFiles.forEach(file => fileList.items.add(file));
      onSubmit(fileList.files);
    }
  };

  const getButtonText = () => {
    if (isUploading) return 'Converting...';
    if (selectedFiles.length === 0) return 'Convert to Markdown';
    if (selectedFiles.length === 1) return 'Convert File';
    return `Convert ${selectedFiles.length} Files`;
  };

  return (
    <form onSubmit={handleSubmit}>
      <div 
        className={`upload-area ${isDragOver ? 'dragover' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div>📁 Drag files here or click to select</div>
        <input 
          type="file" 
          multiple 
          required 
          ref={fileInputRef}
          onChange={handleFileChange}
        />
        
        {isUploading && (
          <div className="progress">
            <div className="progress-bar" style={{ width: `${progress}%` }}></div>
          </div>
        )}
        
        <button type="submit" disabled={isUploading || selectedFiles.length === 0}>
          {getButtonText()}
        </button>
      </div>
    </form>
  );
};
