"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGenreList = exports.getRecentlyAdded = exports.searchByGenre = exports.getEpisodeLinks = exports.search = exports.getAnimeDetails = exports.getPopular = void 0;
const cheerio_1 = __importDefault(require("cheerio"));
const axios_1 = __importDefault(require("axios"));
const baseURL = "https://gogoanime.so/";
function getPopular(page) {
    return __awaiter(this, void 0, void 0, function* () {
        let results = [];
        const siteUrl = `${baseURL}popular.html?page=${page}`;
        yield axios_1.default
            .get(siteUrl)
            .then((response) => __awaiter(this, void 0, void 0, function* () {
            const html = response.data;
            try {
                var $ = cheerio_1.default.load(html);
                $(".img").each((index, element) => {
                    let title = $(element).children("a").attr().title;
                    let id = $(element).children("a").attr().href.slice(10);
                    let image = $(element).children("a").children("img").attr().src;
                    results.push({ id, title, image });
                });
            }
            catch (error) {
                throw error;
            }
        }))
            .catch((error) => {
            throw {
                error: error.message,
            };
        });
        return results;
    });
}
exports.getPopular = getPopular;
function getAnimeDetails(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const siteUrl = `${baseURL}category/${id}`;
        let type = "";
        let summary = "";
        let released = 0;
        let status = "";
        let genres = [];
        let otherName = "";
        let title = "";
        let image = "";
        let totalEpisodes = 0;
        let result = {};
        yield axios_1.default
            .get(siteUrl)
            .then((response) => __awaiter(this, void 0, void 0, function* () {
            const html = response.data;
            try {
                var $ = cheerio_1.default.load(html);
                title = $(".anime_info_body_bg").children("h1").text();
                image = $(".anime_info_body_bg").children("img").attr().src;
                $("p.type").each((index, element) => {
                    if ("Type: " == $(element).children("span").text()) {
                        let tmpType = $(element)
                            .text()
                            .slice(5)
                            .split(" ");
                        tmpType = tmpType.map((el) => el.trim());
                        tmpType = tmpType.filter(Boolean);
                    }
                    else if ("Plot Summary: " == $(element).children("span").text()) {
                        summary = $(element).text().slice(13).trimStart().trimEnd();
                    }
                    else if ("Status: " == $(element).children("span").text()) {
                        status = $(element).text().slice(7).replace(/\n/g, " ").trim();
                    }
                    else if ("Genre: " == $(element).children("span").text()) {
                        let genresByComma = $(element)
                            .text()
                            .slice(6)
                            .replace(/\n/g, " ")
                            .replace(/\t/g, " ")
                            .trim();
                        genres = genresByComma.split(",");
                        genres = genres.map((g) => g.trimStart());
                    }
                    else if ("Other name: " == $(element).children("span").text()) {
                        otherName = $(element).text().slice(11).trimStart();
                    }
                });
                totalEpisodes = Number($("#episode_page").children("li").last().children("a").attr().ep_end);
                result = {
                    id,
                    title,
                    image,
                    type,
                    summary,
                    released,
                    genres,
                    status,
                    totalEpisodes,
                    otherName,
                };
            }
            catch (error) {
                throw error;
            }
        }))
            .catch((error) => {
            throw {
                error: error.message,
            };
        });
        return result;
    });
}
exports.getAnimeDetails = getAnimeDetails;
function search(word, page) {
    return __awaiter(this, void 0, void 0, function* () {
        let results = [];
        const siteUrl = `${baseURL}search.html?keyword=${word}&page=${page}`;
        yield axios_1.default
            .get(siteUrl)
            .then((response) => __awaiter(this, void 0, void 0, function* () {
            const html = response.data;
            try {
                var $ = cheerio_1.default.load(html);
                $(".img").each((index, element) => {
                    let title = $(element).children("a").attr().title;
                    let id = $(element).children("a").attr().href.slice(10);
                    let image = $(element).children("a").children("img").attr().src;
                    results.push({ title, id, image });
                });
            }
            catch (error) {
                throw error;
            }
        }))
            .catch((error) => {
            throw {
                error: error.message,
            };
        });
        return results;
    });
}
exports.search = search;
function getEpisodeLinks(id, episode) {
    return __awaiter(this, void 0, void 0, function* () {
        let animeStreamingLinkGogo;
        let finalLinksList = [];
        const siteUrl = `${baseURL}${id}-episode-${episode}`;
        yield axios_1.default
            .get(siteUrl)
            .then((response) => __awaiter(this, void 0, void 0, function* () {
            const html = response.data;
            try {
                var $ = cheerio_1.default.load(html);
                if ($(".entry-title").text() === "404") {
                    throw new Error("Episode not found");
                }
                animeStreamingLinkGogo = $("li.anime")
                    .children("a")
                    .attr("data-video");
                const downloadsLinkGogo = "https:" +
                    animeStreamingLinkGogo.replace("streaming.php", "download");
                yield axios_1.default
                    .get(downloadsLinkGogo)
                    .then((downloadsResponse) => __awaiter(this, void 0, void 0, function* () {
                    const htmlDownloads = downloadsResponse.data;
                    try {
                        var $2 = cheerio_1.default.load(htmlDownloads);
                        $2("a").each((i, e) => {
                            if ($2(e).attr().download === "") {
                                const quality = $2(e).text().split("Download")[1].trim();
                                finalLinksList.push({
                                    link: $2(e).attr().href,
                                    quality,
                                });
                            }
                        });
                    }
                    catch (error) {
                        throw error;
                    }
                }))
                    .catch((error) => {
                    throw error;
                });
            }
            catch (error) {
                throw error;
            }
        }))
            .catch((error) => {
            throw {
                error: error.message,
            };
        });
        return finalLinksList;
    });
}
exports.getEpisodeLinks = getEpisodeLinks;
function searchByGenre(genre, page) {
    return __awaiter(this, void 0, void 0, function* () {
        let results = [];
        const siteUrl = `${baseURL}genre/${genre}?page=${page}`;
        yield axios_1.default
            .get(siteUrl)
            .then((response) => __awaiter(this, void 0, void 0, function* () {
            const html = response.data;
            try {
                var $ = cheerio_1.default.load(html);
                $(".img").each((index, element) => {
                    let title = $(element).children("a").attr().title;
                    let id = $(element).children("a").attr().href.slice(10);
                    let image = $(element).children("a").children("img").attr().src;
                    results.push({ title, id, image });
                });
            }
            catch (error) {
                throw error;
            }
        }))
            .catch((error) => {
            throw {
                error: error.message,
            };
        });
        return results;
    });
}
exports.searchByGenre = searchByGenre;
function getRecentlyAdded(page) {
    return __awaiter(this, void 0, void 0, function* () {
        let results = [];
        const siteUrl = `${baseURL}?page=${page}`;
        yield axios_1.default
            .get(siteUrl)
            .then((response) => __awaiter(this, void 0, void 0, function* () {
            try {
                const html = response.data;
                var $ = cheerio_1.default.load(html);
                $(".img").each((index, element) => {
                    let title = $(element).children("a").attr().title;
                    let id = $(element).children("a").attr().href.slice(1);
                    let image = $(element).children("a").children("img").attr().src;
                    let epNumber = $(element)
                        .parent()
                        .children("p.episode")
                        .text()
                        .replace(" ", "-")
                        .toLowerCase();
                    id = id.replace("-" + epNumber, "");
                    let episodeNumber = Number(epNumber.replace("episode-", "")) || 0;
                    results.push({ id, title, image, episodeNumber });
                });
            }
            catch (error) {
                throw error;
            }
        }))
            .catch((error) => {
            throw {
                error: error.message,
            };
        });
        return results;
    });
}
exports.getRecentlyAdded = getRecentlyAdded;
function getGenreList() {
    return __awaiter(this, void 0, void 0, function* () {
        let list = [];
        yield axios_1.default
            .get(baseURL)
            .then((response) => __awaiter(this, void 0, void 0, function* () {
            try {
                const html = response.data;
                var $ = cheerio_1.default.load(html);
                $("nav.genre")
                    .children("ul")
                    .children("li")
                    .each((index, element) => {
                    list.push($(element).text());
                });
            }
            catch (error) {
                throw error;
            }
        }))
            .catch((error) => {
            throw {
                error: error.message,
            };
        });
        return list;
    });
}
exports.getGenreList = getGenreList;
//# sourceMappingURL=index.js.map