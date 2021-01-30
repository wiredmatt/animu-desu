export interface BaseAnime {
  id: string;
  title: string;
  image: string;
}

export interface AnimeDetails extends BaseAnime {
  type: string;
  summary: string;
  released: Released;
  genres: string[];
  status: string;
  totalEpisodes: number;
  otherName: string;
}

export interface RecentlyAddedAnime extends BaseAnime {
  episodeNumber: number;
}

export interface Released {
  season: string;
  year: number;
}

export interface AnimeEpisode {
  link: string;
  quality: string;
}
