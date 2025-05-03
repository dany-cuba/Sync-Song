type Song = {
  src: string;
  title?: string;
  artist?: string;
  cover?: string;
};

type AudioPlayerProps = {
  song: Song;
};

export type { Song, AudioPlayerProps };
