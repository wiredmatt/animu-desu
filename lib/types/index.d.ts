export interface BaseAnime {
    id: string;
    title: string;
    image: string;
}
export interface AnimeAndDate extends BaseAnime {
    released: number;
}
export interface AnimeDetails extends AnimeAndDate {
    type: string;
    summary: string;
    genres: string[];
    status: string;
    totalEpisodes: number;
    otherNames: string[];
}
export interface RecentlyAddedAnime extends BaseAnime {
    episodeNumber: number;
}
export interface AnimeEpisode {
    link: string;
    quality: string;
}
//# sourceMappingURL=index.d.ts.map