
export const OUTPUT_FORMATS = [
  { value: 'mp3', label: 'MP3' },
  { value: 'm4a', label: 'AAC (.m4a)' },
  { value: 'ogg', label: 'OGG (Vorbis)' },
  { value: 'wav', label: 'WAV (Uncompressed)' },
];

export const BITRATE_OPTIONS = [
  { value: '64k', label: '64 kbps (Speech)' },
  { value: '128k', label: '128 kbps (Standard Music)' },
  { value: '192k', label: '192 kbps (High Quality Music)' },
  { value: '256k', label: '256 kbps (Studio Quality)' },
  { value: '320k', label: '320 kbps (Lossless feel)' },
];

export const SUPPORTED_INPUT_FORMATS = [
  'audio/wav',
  'audio/x-wav',
  'audio/wave',
  'audio/x-pn-wav',
  'audio/aiff',
  'audio/x-aiff',
  'audio/flac',
  'audio/x-flac',
  'audio/mpeg',
  'audio/mp3',
  'audio/aac',
  'audio/ogg',
  'audio/mp4',
  'audio/x-m4a',
];

// Maximum file size: 100MB
export const MAX_FILE_SIZE = 100 * 1024 * 1024;
