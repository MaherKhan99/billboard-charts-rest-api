# billboard-charts-rest-api
A rest-api for getting data related to popular music. All data was scraped from billboard's hot 100 chart.

Source: `https://www.billboard.com/charts/hot-100`

Routes
======

| Endpoint         | Method  | Query Params        | Return                               |
|------------------|-------- |---------------------|--------------------------------------|
| `/songs`         | `GET`   | `amount`            | Returns a list of all songs          |
| `/songs/titles`  | `GET`   |  `title`            | Returns a list of all titles         |
| `/songs/artists` | `GET`   |  `artist`           | Returns a list of all artists        |
| `/songs/ranks`   | `GET`   |`rank, start, end`   | Returns a list of rank related data  | 

Query Params
============
To add query params to a request, follow this format: `/endpoint/?param1=param1-name&param2=param2-name`

Querying resources with spaces (e.g song name and artist) should use dashes in place of the spaces.
Example: `/songs/artists/?artist=artist-name`

| Param    | What it does                                                               |
|----------|----------------------------------------------------------------------------|
| `amount` | `Specifies how many songs to query`                                        |
| `title`  | `Specifies a name of a song to query`                                      |
| `artist` | `Specifies an artist whose songs to query`                                 |
| `rank`   | `Specifies the rank of a song to query`                                    |
| `start`  | `Specifies start of query range when querying for a range of songs`        |
| `end`    | `Specifies start of query range when querying for a range of songs`        |

**Note that start and end query paramters must both be used together in order to hit a valid endpoint**