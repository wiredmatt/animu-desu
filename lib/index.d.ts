import { BaseAnime, AnimeAndDate, AnimeDetails, AnimeEpisode, RecentlyAddedAnime } from "./types";
declare type int = number;
export { BaseAnime, AnimeDetails, AnimeEpisode, RecentlyAddedAnime };
export declare function getPopular(page: int): Promise<BaseAnime[]>;
export declare function getAnimeDetails(id: string): Promise<AnimeDetails>;
export declare function search(word: string, page: int): Promise<AnimeAndDate[]>;
export declare function getEpisodeLinks(id: string, episode: int): Promise<AnimeEpisode[]>;
export declare function searchByGenre(genre: string, page: int): Promise<BaseAnime[]>;
export declare function getRecentlyAdded(page: int): Promise<RecentlyAddedAnime[]>;
export declare function getGenreList(): Promise<string[]>;
//# sourceMappingURL=index.d.ts.map