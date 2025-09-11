
import React from 'react';
import type { ResultDetails } from '../types';

interface ResultsDisplayProps {
  result: ResultDetails;
  originalSizeFormatted: string;
  newSizeFormatted: string;
  onReset: () => void;
}

export const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ 
  result,
  originalSizeFormatted,
  newSizeFormatted,
  onReset 
}) => {
  const savings = Math.round(
    ((result.originalSize - result.newSize) / result.originalSize) * 100
  );

  return (
    <div className="bg-gray-700/50 p-6 rounded-lg text-center space-y-4 animate-fade-in">
      <h3 className="text-2xl font-bold text-green-400">Success!</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-gray-300">
        <div className="bg-gray-800 p-3 rounded-md">
          <p className="text-sm text-gray-400">Original Size</p>
          <p className="text-lg font-semibold">{originalSizeFormatted}</p>
        </div>
        <div className="bg-gray-800 p-3 rounded-md">
          <p className="text-sm text-gray-400">New Size</p>
          <p className="text-lg font-semibold">{newSizeFormatted}</p>
        </div>
        <div className="bg-gray-800 p-3 rounded-md">
          <p className="text-sm text-gray-400">You Saved</p>
          <p className="text-lg font-semibold text-green-400">{savings}%</p>
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-4 justify-center pt-4">
        <a
          href={result.downloadUrl}
          download={result.outputFilename}
          className="w-full md:w-auto bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-md transition-colors duration-300"
        >
          Download File
        </a>
        <button
          onClick={onReset}
          className="w-full md:w-auto bg-gray-600 hover:bg-gray-500 text-white font-bold py-3 px-6 rounded-md transition-colors duration-300"
        >
          Compress Another
        </button>
      </div>
    </div>
  );
};
