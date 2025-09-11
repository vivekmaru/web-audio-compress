
import React from 'react';
import type { CompressionOptions } from '../types';
import { OUTPUT_FORMATS, BITRATE_OPTIONS } from '../constants';

interface CompressionOptionsPanelProps {
  fileName: string;
  fileSize: string;
  options: CompressionOptions;
  onOptionsChange: (options: CompressionOptions) => void;
  onCompress: () => void;
  isCompressing: boolean;
}

export const CompressionOptionsPanel: React.FC<CompressionOptionsPanelProps> = ({
  fileName,
  fileSize,
  options,
  onOptionsChange,
  onCompress,
  isCompressing,
}) => {
  return (
    <div className="bg-gray-700/50 p-6 rounded-lg space-y-4 animate-fade-in">
      <div>
        <h3 className="text-lg font-semibold text-gray-200">Your File</h3>
        <div className="flex justify-between items-center mt-2 text-gray-400 text-sm">
          <span>{fileName}</span>
          <span>{fileSize}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="format" className="block text-sm font-medium text-gray-300 mb-1">
            Output Format
          </label>
          <select
            id="format"
            name="format"
            className="w-full bg-gray-800 border border-gray-600 rounded-md py-2 px-3 text-white focus:ring-blue-500 focus:border-blue-500"
            value={options.format}
            onChange={(e) => onOptionsChange({ ...options, format: e.target.value })}
            disabled={isCompressing}
          >
            {OUTPUT_FORMATS.map((format) => (
              <option key={format.value} value={format.value}>
                {format.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="bitrate" className="block text-sm font-medium text-gray-300 mb-1">
            Bitrate / Quality
          </label>
          <select
            id="bitrate"
            name="bitrate"
            className="w-full bg-gray-800 border border-gray-600 rounded-md py-2 px-3 text-white focus:ring-blue-500 focus:border-blue-500"
            value={options.bitrate}
            onChange={(e) => onOptionsChange({ ...options, bitrate: e.target.value })}
            disabled={isCompressing}
          >
            {BITRATE_OPTIONS.map((bitrate) => (
              <option key={bitrate.value} value={bitrate.value}>
                {bitrate.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <button
          onClick={onCompress}
          disabled={isCompressing}
          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-3 px-4 rounded-md transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {isCompressing ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Compressing...
            </>
          ) : (
            'Compress File'
          )}
        </button>
      </div>
    </div>
  );
};
