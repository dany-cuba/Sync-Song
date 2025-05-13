export interface Song {
  id: string;
  key: string;
  name: string;
  size: number;
  uploadedAt: number; // timestamp en milisegundos
}

export interface MusicLibraryData {
  songs: Song[];
  error?: string;
}
