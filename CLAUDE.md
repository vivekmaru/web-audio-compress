# CLAUDE.md - Web Audio Compressor

## Project Overview

Web Audio Compressor is a browser-based audio compression tool that allows users to compress audio files directly in their browser without uploading to a server. The application uses FFmpeg WebAssembly to perform client-side audio processing.

**Key Features:**
- Client-side audio compression (no server uploads)
- Multiple output formats support
- Configurable bitrate options
- Real-time compression progress tracking
- Download compressed files directly

## Tech Stack

- **Frontend Framework**: React 19.1.1
- **Build Tool**: Vite 6.2.0
- **Language**: TypeScript 5.8.2
- **Audio Processing**: @ffmpeg/ffmpeg 0.12.15 (WebAssembly)
- **Styling**: TailwindCSS (inline classes)

## Project Structure

```
/home/user/web-audio-compress/
├── App.tsx                 # Main application component
├── index.tsx              # Application entry point
├── index.html             # HTML template
├── types.ts               # TypeScript type definitions
├── constants.ts           # Application constants (formats, bitrates)
├── components/            # React components
│   ├── FileUpload.tsx
│   ├── CompressionOptionsPanel.tsx
│   ├── ProgressBar.tsx
│   ├── ResultsDisplay.tsx
│   └── Spinner.tsx
├── package.json           # Dependencies and scripts
├── vite.config.ts         # Vite configuration
├── tsconfig.json          # TypeScript configuration
└── metadata.json          # App metadata
```

## Application Architecture

### State Management

The app uses React's `useState` hook to manage application state:

- **AppState** (`types.ts`): Enum tracking the application lifecycle
  - `LOADING_FFMPEG`: Initial load of FFmpeg library
  - `IDLE`: Ready for file upload
  - `FILE_LOADED`: File uploaded, ready to compress
  - `COMPRESSING`: Actively compressing audio
  - `DONE`: Compression complete
  - `ERROR`: Error occurred

- **Key State Variables** (`App.tsx:23-32`):
  - `appState`: Current application state
  - `inputFile`: Uploaded audio file
  - `compressionOptions`: Selected format and bitrate
  - `progress`: Compression progress (0-100)
  - `result`: Compression results with file details
  - `error`: Error messages

### FFmpeg Integration

FFmpeg is loaded via CDN and runs as WebAssembly in the browser:

1. **Loading** (`App.tsx:36-52`): FFmpeg loads from unpkg.com CDN
2. **File Processing** (`App.tsx:65-118`):
   - Write input file to FFmpeg virtual filesystem
   - Execute compression command with selected options
   - Read output file from virtual filesystem
   - Create downloadable Blob URL
   - Clean up filesystem

### Component Structure

- **FileUpload**: Drag-and-drop or click-to-upload interface
- **CompressionOptionsPanel**: Format and bitrate selection
- **ProgressBar**: Real-time compression progress
- **ResultsDisplay**: Shows compression results and download button
- **Spinner**: Loading indicator

## Configuration Files

### Output Formats (`constants.ts`)

Supported audio formats with labels and file extensions.

### Bitrate Options (`constants.ts`)

Compression quality presets (e.g., 64k, 128k, 192k, 256k).

## Development Guidelines

### Running the Project

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Code Style

- Use functional components with hooks
- TypeScript strict mode enabled
- Prefer `const` over `let`
- Use meaningful variable names
- Extract magic numbers to constants
- Components in separate files under `components/`

### Adding New Features

1. **New Audio Format**:
   - Add to `OUTPUT_FORMATS` in `constants.ts`
   - Update type definitions if needed

2. **New Compression Option**:
   - Add to `BITRATE_OPTIONS` in `constants.ts`
   - Update `CompressionOptions` type in `types.ts`
   - Modify FFmpeg command in `App.tsx:87-91`

3. **New Component**:
   - Create in `components/` directory
   - Import and use in `App.tsx`
   - Follow existing component patterns

### Working with FFmpeg

FFmpeg commands are executed via the `run()` method:

```typescript
await ffmpeg.run(
  '-i', inputFilename,      // Input file
  '-b:a', bitrate,          // Audio bitrate
  outputFilename            // Output file
);
```

Common FFmpeg operations:
- `FS('writeFile')`: Write file to virtual filesystem
- `FS('readFile')`: Read file from virtual filesystem
- `FS('unlink')`: Delete file from virtual filesystem
- `setProgress()`: Monitor compression progress

## Important Notes

### Browser Compatibility

- Requires browsers with WebAssembly support
- SharedArrayBuffer required (secure context/HTTPS)
- Modern browsers (Chrome 60+, Firefox 52+, Safari 11+)

### Performance Considerations

- Large files may take time to process
- Processing is CPU-intensive (runs in worker thread)
- Memory usage scales with file size

### Security

- All processing happens client-side
- No files uploaded to servers
- No data leaves the user's device

## Common Tasks for Claude

### Debugging Issues

1. Check browser console for FFmpeg logs
2. Verify FFmpeg loaded successfully (`AppState.IDLE`)
3. Check file format compatibility
4. Review error state and messages

### Adding New Features

1. Review existing code structure
2. Update types in `types.ts`
3. Modify constants in `constants.ts`
4. Update UI components as needed
5. Test compression with various file types

### Code Maintenance

- Keep dependencies updated (especially @ffmpeg/ffmpeg)
- Maintain TypeScript type safety
- Ensure responsive design works on mobile
- Test error handling paths

## Testing Checklist

- [ ] Upload various audio formats (MP3, WAV, OGG, M4A)
- [ ] Test all bitrate options
- [ ] Test all output formats
- [ ] Verify progress tracking
- [ ] Confirm download works
- [ ] Test error handling (invalid files)
- [ ] Check responsive design on mobile
- [ ] Verify file cleanup (no memory leaks)

## Resources

- FFmpeg.js Documentation: https://github.com/ffmpegwasm/ffmpeg.wasm
- React Documentation: https://react.dev
- Vite Documentation: https://vitejs.dev
- TypeScript Documentation: https://www.typescriptlang.org

## Version Information

- Current Version: 0.0.0
- React: 19.1.1
- FFmpeg: 0.12.15
- TypeScript: 5.8.2
- Vite: 6.2.0
