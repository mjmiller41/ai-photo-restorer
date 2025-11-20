
import React, { useState, useCallback } from 'react';
import { UploadIcon } from './icons';

interface ImageUploaderProps {
  onImageUpload: (file: File) => void;
  setError: (error: string | null) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload, setError }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = useCallback((files: FileList | null) => {
    if (files && files[0]) {
      const file = files[0];
      if (!file.type.startsWith('image/')) {
        setError('Please upload a valid image file (PNG, JPG, etc.).');
        return;
      }
      setError(null);
      onImageUpload(file);
    }
  }, [onImageUpload, setError]);

  const handleDragEnter = useCallback((e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback((e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    handleFileChange(e.dataTransfer.files);
  }, [handleFileChange]);

  return (
    <div className='select-none text-center w-full'>
      {/*
      className={`relative w-full max-w-xl mx-auto border-2 border-dashed rounded-lg p-8 text-center transition-all duration-300 ${isDragging ? 'border-amber-400 bg-gray-800/50' : 'border-gray-600 hover:border-gray-500'}`}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      >
       */}
      <input
        type="file"
        id="file-upload"
        className="hidden"
        accept="image/*"
        onChange={(e) => handleFileChange(e.target.files)}
      />
      <label htmlFor="file-upload"
        className={`cursor-pointer flex flex-col items-center justify-center space-y-4 w-full max-w-xl mx-auto border-2 border-dashed rounded-lg p-8 transition-all duration-300 ${isDragging ? 'border-amber-400 bg-gray-800/50' : 'border-gray-600 hover:border-gray-500'}`}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        {/* <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center justify-center space-y-4">*/}
        <UploadIcon className="w-16 h-16 text-gray-500" />
        <p className="text-gray-400">
          <span className="font-semibold text-amber-400">Click to upload</span> or drag and drop
        </p>
        <p className="text-xs text-gray-500">Supports JPEG, PNG, WEBP</p>
      </label>
    </div>
  );
};

export default ImageUploader;
