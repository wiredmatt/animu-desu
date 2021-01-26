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
declare function getPopular(page: int): Promise<BaseAnime[]>;
declare function getAnimeDetails(id: string): Promise<AnimeDetails>;
declare function search(word: string, page: int): Promise<BaseAnime[]>;
declare function getEpisodeLinks(id: string, episode: int): Promise<AnimeEpisode[]>;
declare function searchByGenre(genre: string, page: int): Promise<BaseAnime[]>;
declare function getRecentlyAdded(page: int): Promise<RecentlyAddedAnime[]>;
declare function getGenreList(): Promise<string[]>;
declare const _default: {
    getPopular: typeof getPopular;
    getAnimeDetails: typeof getAnimeDetails;
    search: typeof search;
    getEpisodeLinks: typeof getEpisodeLinks;
    searchByGenre: typeof searchByGenre;
    getRecentlyAdded: typeof getRecentlyAdded;
    getGenreList: typeof getGenreList;
};
export default _default;
//# sourceMappingURL=index.d.ts.map