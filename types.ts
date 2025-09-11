
export enum AppState {
  LOADING_FFMPEG,
  IDLE,
  FILE_LOADED,
  COMPRESSING,
  DONE,
  ERROR,
}

export interface CompressionOptions {
  format: string;
  bitrate: string;
}

export interface ResultDetails {
  originalSize: number;
  newSize: number;
  downloadUrl: string;
  outputFilename: string;
}
