
import React from 'react';

interface ProgressBarProps {
  progress: number;
  statusMessage: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ progress, statusMessage }) => {
  return (
    <div className="w-full space-y-2 animate-fade-in">
      <div className="flex justify-between items-center">
        <p className="text-sm font-medium text-gray-300">{statusMessage}</p>
        <p className="text-sm font-medium text-blue-400">{progress}%</p>
      </div>
      <div className="w-full bg-gray-700 rounded-full h-2.5">
        <div
          className="bg-gradient-to-r from-blue-500 to-purple-600 h-2.5 rounded-full transition-all duration-300 ease-in-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};
