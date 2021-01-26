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

You can import only the function(s) you need, or the whole package.

```js
import { getPopular } from "animu-desu";

getPopular(1)...

import AnimuGetter from "animu-desu";

AnimuGetter.getPopular(1)...
```

Get the popular animes

```js
import { getPopular } from "animu-desu";

//getting the popular animes from page 1.
getPopular(1)
  .then((data) => console.log(data))
  .catch((err) => console.log(err));
```

Get the list of genres

```js
import { getGenreList } from "animu-desu";

getGenreList()
  .then((data) => console.log(data))
  .catch((err) => console.log(err));
```

Search anime by genre

```js
import { searchByGenre } from "animu-desu";

//getting the action animes from page 1.
searchByGenre("action", 1)
  .then((data) => console.log(data))
  .catch((err) => console.log(err));
```

Search anime by query

```js
import AnimuGetter from "animu-desu";

//getting the animes that match with "One piece" from page 1.
import { search } from "animu-desu"

search("One piece", 1)
  .then((data) => console.log(data))
  .catch((err) => console.log(err));
```

Search recently added anime episodes

```js
import { getRecentlyAdded } from "animu-desu";

//getting the recently added animes from page 1.
getRecentlyAdded(1)
  .then((data) => console.log(data))
  .catch((err) => console.log(err));
```

Get details of an anime

```js
import { getAnimeDetails } from "animu-desu";

//getting the details of the anime with the ID "one-piece".
getAnimeDetails("one-piece")
  .then((data) => console.log(data))
  .catch((err) => console.log(err));
```

Get links for an episode of an anime

```js
import { getEpisodeLinks } from "animu-desu";

//getting the links for the episode 959 of the anime with the ID "one-piece".
getEpisodeLinks("one-piece", 959)
  .then((data) => console.log(data))
  .catch((err) => console.log(err));
```

## NOTE

This package will only work in a node enviorement, as it uses cheerio to do web scraping.

## License

[MIT](http://vjpr.mit-license.org)
