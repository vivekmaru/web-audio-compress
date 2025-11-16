# Web Audio Compressor

A browser-based audio compression tool that processes files entirely on your device using FFmpeg.wasm. No server uploads required - all processing happens locally in your browser for maximum privacy.

## Features

- **100% Client-Side Processing** - All audio processing happens in your browser
- **Privacy-Focused** - Files never leave your device
- **Multiple Formats** - Export to MP3, AAC (.m4a), OGG (Vorbis), or WAV
- **Quality Control** - Choose from 64kbps to 320kbps bitrates
- **Drag & Drop Interface** - Easy file upload with visual feedback
- **Real-Time Progress** - See compression progress in real-time
- **File Size Limit** - Accepts files up to 100MB

## Supported Input Formats

- WAV
- FLAC
- MP3
- M4A / AAC
- OGG
- AIFF

## Run Locally

**Prerequisites:**  Node.js (v16 or higher)

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```

3. Open your browser and navigate to the URL shown in the terminal (typically `http://localhost:5173`)

## Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Type Checking

```bash
npm run type-check
```

## Technology Stack

- **React 19** - UI framework
- **TypeScript** - Type safety
- **FFmpeg.wasm** - Audio processing
- **Vite** - Build tool
- **Tailwind CSS** - Styling

## How It Works

1. Upload an audio file (drag & drop or click to select)
2. Choose your desired output format and bitrate
3. Click "Compress Audio"
4. Download your compressed file

All processing is done using FFmpeg compiled to WebAssembly, running entirely in your browser. No data is sent to any server.
