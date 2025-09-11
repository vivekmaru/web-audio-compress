
import React, { useState, useCallback } from 'react';
import { SUPPORTED_INPUT_FORMATS } from '../constants';
import { UploadIcon, CheckCircleIcon } from './Icons';

interface FileUploadProps {
  onFileUpload: (file: File) => void;
  disabled: boolean;
  hasFile: boolean;
}

export const FileUpload: React.FC<FileUploadProps> = ({ onFileUpload, disabled, hasFile }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFile = useCallback((files: FileList | null) => {
    setError(null);
    if (files && files.length > 0) {
      const file = files[0];
      if (SUPPORTED_INPUT_FORMATS.includes(file.type)) {
        onFileUpload(file);
      } else {
        setError(`Unsupported file type: ${file.type || 'unknown'}. Please upload a valid audio file.`);
      }
    }
  }, [onFileUpload]);

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled) setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (!disabled) {
      handleFile(e.dataTransfer.files);
    }
  };

  const handleClick = () => {
    document.getElementById('file-input')?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFile(e.target.files);
  };

  const borderColor = hasFile 
    ? 'border-green-500' 
    : isDragging 
    ? 'border-blue-400' 
    : 'border-gray-600';

  const bgColor = isDragging ? 'bg-gray-700/50' : 'bg-gray-800';

  return (
    <div>
      <div
        className={`relative flex flex-col items-center justify-center w-full p-8 text-center border-2 ${borderColor} border-dashed rounded-lg cursor-pointer ${bgColor} transition-colors duration-300 ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:border-blue-400'}`}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={disabled ? undefined : handleClick}
      >
        <input
          id="file-input"
          type="file"
          className="hidden"
          accept={SUPPORTED_INPUT_FORMATS.join(',')}
          onChange={handleFileChange}
          disabled={disabled}
        />
        {hasFile ? (
          <>
            <CheckCircleIcon className="w-12 h-12 text-green-500 mb-3" />
            <p className="text-lg font-semibold text-gray-200">File Ready!</p>
            <p className="text-sm text-gray-400">Ready to configure compression settings below.</p>
          </>
        ) : (
          <>
            <UploadIcon className="w-12 h-12 text-gray-400 mb-3" />
            <p className="text-lg font-semibold text-gray-200">
              <span className="text-blue-400">Click to upload</span> or drag and drop
            </p>
            <p className="text-sm text-gray-400">WAV, FLAC, MP3, M4A, AAC, or OGG</p>
          </>
        )}
      </div>
      {error && <p className="mt-2 text-sm text-red-400 text-center">{error}</p>}
    </div>
  );
};
