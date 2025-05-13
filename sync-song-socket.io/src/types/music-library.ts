interface Song {
  id: string;
  key: string;
  name: string;
  size: number;
  uploadedAt: number; // timestamp en milisegundos
}

interface MusicLibraryData {
  songs: Song[];
}

export { Song, MusicLibraryData };
