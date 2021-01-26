# animu-desu

> Unofficial API for gogoanime. Fetch anime data and get links for the episodes of the shows you want to watch.

![npm version](https://img.shields.io/badge/npm->=6.9.x-brightgreen.svg)
          <a href="https://github.com/ChrisMichaelPerezSantiago/animeflv/graphs/commit-activity">
            <img alt="Maintenance" src="https://img.shields.io/badge/Maintained%3F-yes-green.svg" target="_blank" />

## Install

```bash
npm i animu-desu
```
or
```bash
yarn add animu-desu
```

## Usage

Get the popular animes
```js
import AnimuGetter from "animu-desu";

//getting the popular animes from page 1.
const popularAnime = AnimuGetter.getPopular(1);
```

Get the list of genres
```js
import AnimuGetter from "animu-desu";

const genreList = AnimuGetter.getGenreList();
```
Search anime by genre
```js
import AnimuGetter from "animu-desu";

//getting the action animes from page 1.
const actionAnimes = AnimuGetter.searchByGenre("action",1);
```
Search anime by query
```js
import AnimuGetter from "animu-desu";

//getting the animes that match with "One piece" from page 1. 
const animes = AnimuGetter.search("One piece",1);
```

Search recently added anime episodes
```js
import AnimuGetter from "animu-desu";

//getting the recently added animes from page 1. 
const recentlyAdded = AnimuGetter.getRecentlyAdded(1);
```
Get details of an anime
```js
import AnimuGetter from "animu-desu";

//getting the details of the anime with the ID "one-piece". 
const onePiece = AnimuGetter.getAnimeDetails("one-piece");
```
Get links for an episode of an anime
```js
import AnimuGetter from "animu-desu";

//getting the links for the episode 959 of the anime with the ID "one-piece". 
const linksForOP959 = AnimuGetter.getEpisodeLinks("one-piece",959);
```

## NOTE
This package will only work in a node enviorement, as it uses cheerio to do web scraping.

## License

[MIT](http://vjpr.mit-license.org)
