import { useState } from 'react';
import { uploadFiles } from '../services/api';

export const useFileUpload = () => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleFilesSelected = (files: FileList) => {
    setSelectedFiles(Array.from(files));
  };

  const handleUpload = async (files: FileList) => {
    if (files.length === 0) {
      alert('Please select at least one file');
      return;
    }

    setIsUploading(true);
    setProgress(0);

    // Simulate progress
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + Math.random() * 15;
        return newProgress >= 90 ? 90 : newProgress;
      });
    }, 200);

    try {
      const blob = await uploadFiles(files);
      
      // Complete progress
      clearInterval(progressInterval);
      setProgress(100);

      // Download the result
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = files.length === 1 ? 
        `${files[0].name.split('.')[0]}.md` : 
        'converted_files.zip';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      // Reset after success
      setTimeout(() => {
        setIsUploading(false);
        setProgress(0);
        setSelectedFiles([]);
      }, 1000);

    } catch (error) {
      clearInterval(progressInterval);
      setIsUploading(false);
      setProgress(0);
      alert(`Upload failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  return {
    selectedFiles,
    isUploading,
    progress,
    handleFilesSelected,
    handleUpload
  };
};
