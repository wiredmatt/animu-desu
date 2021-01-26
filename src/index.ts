import cheerio from "cheerio";
import axios from "axios";

const baseURL = "https://gogoanime.so/";

type int = number;

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

export async function getPopular(page: int): Promise<BaseAnime[]> {
  let results = [] as BaseAnime[];
  const siteUrl = `${baseURL}popular.html?page=${page}`;

  await axios
    .get(siteUrl)
    .then(async (response) => {
      const html = response.data;
      try {
        var $ = cheerio.load(html);
        $(".img").each((index, element) => {
          let title = $(element).children("a").attr().title;
          let id = $(element).children("a").attr().href.slice(10);
          let image = $(element).children("a").children("img").attr().src;
          results.push({ id, title, image });
        });
      } catch (error) {
        throw error;
      }
    })
    .catch((error) => {
      throw {
        error: error.code,
      };
    });

  return results;
}

export async function getAnimeDetails(id: string): Promise<AnimeDetails> {
  const siteUrl = `${baseURL}category/${id}`;

  let type = "";
  let summary = "";
  let released = {} as Released;
  let status = "";
  let genres = [] as string[];
  let otherName = "";
  let title = "";
  let image = "";
  let totalEpisodes = 0;

  let result = {} as AnimeDetails;

  await axios
    .get(siteUrl)
    .then(async (response) => {
      const html = response.data;
      try {
        var $ = cheerio.load(html);
        title = $(".anime_info_body_bg").children("h1").text();
        image = $(".anime_info_body_bg").children("img").attr().src;

        $("p.type").each((index, element) => {
          if ("Type: " == $(element).children("span").text()) {
            let releaseDateAndType = $(element).text().slice(5).split(" ");

            releaseDateAndType = releaseDateAndType.map((el) => el.trim());

            releaseDateAndType = releaseDateAndType.filter(Boolean);

            let season = releaseDateAndType[0];
            let year = Number(releaseDateAndType[1]);

            //example: Fall 2017
            released = { season, year };

            //anime,ova,ona,special...
            type = releaseDateAndType[2];
          } else if ("Plot Summary: " == $(element).children("span").text()) {
            summary = $(element).text().slice(13).trimStart().trimEnd();
          } else if ("Status: " == $(element).children("span").text()) {
            status = $(element).text().slice(7).replace(/\n/g, " ").trim();
          } else if ("Genre: " == $(element).children("span").text()) {
            let genresByComma = $(element)
              .text()
              .slice(6)
              .replace(/\n/g, " ")
              .replace(/\t/g, " ")
              .trim();
            genres = genresByComma.split(",");
            genres = genres.map((g) => g.trimStart());
          } else if ("Other name: " == $(element).children("span").text()) {
            otherName = $(element).text().slice(11).trimStart();
          }
        });
        totalEpisodes = Number(
          $("#episode_page").children("li").last().children("a").attr().ep_end
        );
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
      } catch (error) {
        throw error;
      }
    })
    .catch((error) => {
      throw {
        error: error.message,
      };
    });

  return result;
}

export async function search(word: string, page: int): Promise<BaseAnime[]> {
  let results = [] as BaseAnime[];

  const siteUrl = `${baseURL}search.html?keyword=${word}&page=${page}`;

  await axios
    .get(siteUrl)
    .then(async (response) => {
      const html = response.data;
      try {
        var $ = cheerio.load(html);
        $(".img").each((index, element) => {
          let title = $(element).children("a").attr().title;
          let id = $(element).children("a").attr().href.slice(10);
          let image = $(element).children("a").children("img").attr().src;

          results.push({ title, id, image });
        });
      } catch (error) {
        throw error;
      }
    })
    .catch((error) => {
      throw {
        error: error.message,
      };
    });

  return results;
}

export async function getEpisodeLinks(id: string, episode: int) {
  let animeStreamingLinkGogo: string;
  let finalLinksList = [] as AnimeEpisode[];

  const siteUrl = `${baseURL}${id}-episode-${episode}`;

  await axios
    .get(siteUrl)
    .then(async (response) => {
      const html = response.data;
      try {
        var $ = cheerio.load(html);

        if ($(".entry-title").text() === "404") {
          throw new Error("Episode not found");
        }

        animeStreamingLinkGogo = $("li.anime")
          .children("a")
          .attr("data-video") as string;

        const downloadsLinkGogo =
          "https:" +
          animeStreamingLinkGogo.replace("streaming.php", "download");

        await axios
          .get(downloadsLinkGogo)
          .then(async (downloadsResponse) => {
            const htmlDownloads = downloadsResponse.data;
            try {
              var $2 = cheerio.load(htmlDownloads);
              $2("a").each((i, e) => {
                if ($2(e).attr().download === "") {
                  const quality = $2(e).text().split("Download")[1].trim();

                  finalLinksList.push({
                    link: $2(e).attr().href,
                    quality,
                  });
                }
              });
            } catch (error) {
              throw error;
            }
          })
          .catch((error) => {
            throw error;
          });
      } catch (error) {
        throw error;
      }
    })
    .catch((error) => {
      throw {
        error: error.message,
      };
    });

  return finalLinksList;
}

export async function searchByGenre(genre: string, page: int): Promise<BaseAnime[]> {
  let results = [] as BaseAnime[];

  const siteUrl = `${baseURL}genre/${genre}?page=${page}`;

  await axios
    .get(siteUrl)
    .then(async (response) => {
      const html = response.data;
      try {
        var $ = cheerio.load(html);
        $(".img").each((index, element) => {
          let title = $(element).children("a").attr().title;
          let id = $(element).children("a").attr().href.slice(10);
          let image = $(element).children("a").children("img").attr().src;

          results.push({ title, id, image });
        });
      } catch (error) {
        throw error;
      }
    })
    .catch((error) => {
      throw {
        error: error.message,
      };
    });

  return results;
}

export async function getRecentlyAdded(page: int): Promise<RecentlyAddedAnime[]> {
  let results = [] as RecentlyAddedAnime[];

  const siteUrl = `${baseURL}?page=${page}`;

  await axios
    .get(siteUrl)
    .then(async (response) => {
      try {
        const html = response.data;
        var $ = cheerio.load(html);
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
      } catch (error) {
        throw error;
      }
    })
    .catch((error) => {
      throw error.message;
    });

  return results;
}

export async function getGenreList(): Promise<string[]> {
  let list = [] as string[];
  await axios
    .get(baseURL)
    .then(async (response) => {
      try {
        const html = response.data;
        var $ = cheerio.load(html);
        $("nav.genre")
          .children("ul")
          .children("li")
          .each((index, element) => {
            list.push($(element).text());
          });
      } catch (error) {
        throw error;
      }
    })
    .catch((error) => {
      throw error.message;
    });

  return list;
}