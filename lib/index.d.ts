declare type int = number;
interface BaseAnime {
    id: string;
    title: string;
    image: string;
}
interface AnimeDetails extends BaseAnime {
    type: string;
    summary: string;
    released: Released;
    genres: string[];
    status: string;
    totalEpisodes: number;
    otherName: string;
}
interface RecentlyAddedAnime extends BaseAnime {
    episodeNumber: number;
}
interface Released {
    season: string;
    year: number;
}
interface AnimeEpisode {
    link: string;
    quality: string;
}
export declare function getPopular(page: int): Promise<BaseAnime[]>;
export declare function getAnimeDetails(id: string): Promise<AnimeDetails>;
export declare function search(word: string, page: int): Promise<BaseAnime[]>;
export declare function getEpisodeLinks(id: string, episode: int): Promise<AnimeEpisode[]>;
export declare function searchByGenre(genre: string, page: int): Promise<BaseAnime[]>;
export declare function getRecentlyAdded(page: int): Promise<RecentlyAddedAnime[]>;
export declare function getGenreList(): Promise<string[]>;
export {};
//# sourceMappingURL=index.d.ts.map