export interface BaseAnime {
    id: string;
    title: string;
    image: string;
}
export interface AnimeDetails extends BaseAnime {
    type: string;
    summary: string;
    released: number;
    genres: string[];
    status: string;
    totalEpisodes: number;
    otherName: string;
}
export interface RecentlyAddedAnime extends BaseAnime {
    episodeNumber: number;
}
export interface AnimeEpisode {
    link: string;
    quality: string;
}
//# sourceMappingURL=index.d.ts.map