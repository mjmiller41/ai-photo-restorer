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
        setError('Please upload a valid image file (PNG, JPG, WEBP).');
        return;
      }
      if (file.size > 10 * 1024 * 1024) {
        setError('File size exceeds 10MB limit.');
        return;
      }
      setError(null);
      onImageUpload(file);
    }
  }, [onImageUpload, setError]);

  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    handleFileChange(e.dataTransfer.files);
  }, [handleFileChange]);

  return (
    <div className="select-none w-full">
      <input
        type="file"
        id="file-upload"
        className="hidden"
        accept="image/*"
        onChange={(e) => handleFileChange(e.target.files)}
      />
      <label
        htmlFor="file-upload"
        className="cursor-pointer flex flex-col items-center justify-center w-full rounded-[var(--radius-lg)] p-10 transition-all"
        style={{
          border: `2px dashed ${isDragging ? 'var(--accent)' : 'var(--border-strong)'}`,
          background: isDragging ? 'var(--accent-soft)' : 'var(--surface-sunken)',
          transitionDuration: 'var(--duration-base)',
          transitionTimingFunction: 'var(--ease-standard)',
        }}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        {/* Circular upload glyph */}
        <div
          className="flex items-center justify-center mb-4"
          style={{
            width: 64,
            height: 64,
            borderRadius: '50%',
            background: isDragging ? 'var(--accent)' : 'var(--paper-200)',
            color: isDragging ? 'var(--accent-on)' : 'var(--ink-500)',
            transition: `background var(--duration-base) var(--ease-standard), color var(--duration-base) var(--ease-standard)`,
          }}
        >
          <UploadIcon className="w-7 h-7" />
        </div>

        <p
          className="text-center"
          style={{ fontSize: 'var(--text-sm)', color: 'var(--text-body)' }}
        >
          <span style={{ fontWeight: 600, color: 'var(--accent)' }}>
            Click to upload
          </span>{' '}
          or drag and drop
        </p>
        <p
          className="mt-1 text-center"
          style={{ fontSize: 'var(--text-xs)', color: 'var(--text-faint)' }}
        >
          JPG, PNG, WEBP · up to 10MB
        </p>
      </label>
    </div>
  );
};

export default ImageUploader;
