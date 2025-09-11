
import React, { useState, useEffect, useRef, useCallback } from 'react';
import type { FFmpeg } from '@ffmpeg/ffmpeg';
import { AppState, CompressionOptions, ResultDetails } from './types';
import { OUTPUT_FORMATS, BITRATE_OPTIONS } from './constants';
import { FileUpload } from './components/FileUpload';
import { CompressionOptionsPanel } from './components/CompressionOptionsPanel';
import { ProgressBar } from './components/ProgressBar';
import { ResultsDisplay } from './components/ResultsDisplay';
import { Spinner } from './components/Spinner';

// Helper to format bytes into a human-readable string
const formatBytes = (bytes: number, decimals = 2): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.LOADING_FFMPEG);
  const [inputFile, setInputFile] = useState<File | null>(null);
  const [compressionOptions, setCompressionOptions] = useState<CompressionOptions>({
    format: OUTPUT_FORMATS[0].value,
    bitrate: BITRATE_OPTIONS[1].value,
  });
  const [progress, setProgress] = useState(0);
  const [statusMessage, setStatusMessage] = useState('Loading necessary components...');
  const [result, setResult] = useState<ResultDetails | null>(null);
  const [error, setError] = useState<string | null>(null);

  const ffmpegRef = useRef<FFmpeg | null>(null);

  const loadFfmpeg = useCallback(async () => {
    try {
      const { createFFmpeg } = (window as any).FFmpeg;
      const ffmpegInstance: FFmpeg = createFFmpeg({
        log: true,
        corePath: 'https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd/ffmpeg-core.js',
      });
      await ffmpegInstance.load();
      ffmpegRef.current = ffmpegInstance;
      setAppState(AppState.IDLE);
      setStatusMessage('');
    } catch (err) {
      console.error('Failed to load ffmpeg.wasm:', err);
      setError('Could not load the audio processing library. Please refresh the page.');
      setAppState(AppState.ERROR);
    }
  }, []);

  useEffect(() => {
    loadFfmpeg();
  }, [loadFfmpeg]);

  const handleFileUpload = useCallback((file: File) => {
    setInputFile(file);
    setResult(null);
    setError(null);
    setAppState(AppState.FILE_LOADED);
  }, []);

  const handleCompress = async () => {
    if (!inputFile || !ffmpegRef.current) return;

    setAppState(AppState.COMPRESSING);
    setError(null);
    setProgress(0);
    setStatusMessage('Preparing your file...');
    
    const ffmpeg = ffmpegRef.current;
    const { fetchFile } = (window as any).FFmpeg;

    try {
      const inputFilename = inputFile.name;
      const outputFilename = `${inputFilename.split('.').slice(0, -1).join('.')}_compressed.${compressionOptions.format}`;

      ffmpeg.FS('writeFile', inputFilename, await fetchFile(inputFile));

      ffmpeg.setProgress(({ ratio }) => {
        setProgress(Math.round(ratio * 100));
        setStatusMessage(`Compressing... ${Math.round(ratio * 100)}%`);
      });

      const command = [
        '-i', inputFilename,
        '-b:a', compressionOptions.bitrate,
        outputFilename
      ];

      await ffmpeg.run(...command);
      
      setStatusMessage('Finalizing...');

      const data = ffmpeg.FS('readFile', outputFilename);
      const blob = new Blob([data.buffer], { type: `audio/${compressionOptions.format}` });
      const url = URL.createObjectURL(blob);

      setResult({
        originalSize: inputFile.size,
        newSize: blob.size,
        downloadUrl: url,
        outputFilename: outputFilename,
      });

      setAppState(AppState.DONE);
      setStatusMessage('Compression complete!');
      ffmpeg.FS('unlink', inputFilename);
      ffmpeg.FS('unlink', outputFilename);

    } catch (err) {
      console.error('Compression failed:', err);
      setError('An error occurred during compression. The file format might be unsupported or the file could be corrupt.');
      setAppState(AppState.ERROR);
    }
  };

  const handleReset = () => {
    if (result?.downloadUrl) {
      URL.revokeObjectURL(result.downloadUrl);
    }
    setInputFile(null);
    setResult(null);
    setError(null);
    setProgress(0);
    setStatusMessage('');
    setAppState(AppState.IDLE);
  };

  const isProcessing = appState === AppState.COMPRESSING || appState === AppState.LOADING_FFMPEG;

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 flex flex-col items-center justify-center p-4 font-sans">
      <div className="w-full max-w-2xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
            Audio Compressor
          </h1>
          <p className="text-gray-400 mt-2">Compress your audio files directly in your browser.</p>
        </header>

        <main className="bg-gray-800 rounded-lg shadow-xl p-6 md:p-8 space-y-6">
          {appState === AppState.LOADING_FFMPEG && (
            <div className="flex flex-col items-center justify-center text-center p-8">
              <Spinner />
              <p className="mt-4 text-lg text-gray-300">{statusMessage}</p>
            </div>
          )}

          {appState !== AppState.LOADING_FFMPEG && (
             <FileUpload onFileUpload={handleFileUpload} disabled={isProcessing} hasFile={!!inputFile} />
          )}

          {error && (
            <div className="bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-md text-center">
              <p className="font-bold">Error</p>
              <p className="text-sm">{error}</p>
            </div>
          )}

          {inputFile && [AppState.FILE_LOADED, AppState.COMPRESSING, AppState.DONE, AppState.ERROR].includes(appState) && (
             <CompressionOptionsPanel
                fileName={inputFile.name}
                fileSize={formatBytes(inputFile.size)}
                options={compressionOptions}
                onOptionsChange={setCompressionOptions}
                onCompress={handleCompress}
                isCompressing={appState === AppState.COMPRESSING}
             />
          )}

          {appState === AppState.COMPRESSING && (
            <ProgressBar progress={progress} statusMessage={statusMessage} />
          )}

          {appState === AppState.DONE && result && (
            <ResultsDisplay 
              result={result} 
              originalSizeFormatted={formatBytes(result.originalSize)}
              newSizeFormatted={formatBytes(result.newSize)}
              onReset={handleReset} 
            />
          )}
        </main>
        
        <footer className="text-center mt-8 text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} Web Audio Compressor. All processing is done on your device.</p>
        </footer>
      </div>
    </div>
  );
};

export default App;
