# billboard-charts-rest-api
A rest-api for getting data related to popular music

Routes
======

| Endpoint         | Query Params        | Return                               |
|------------------|---------------------|--------------------------------------|
| `/songs`         | `amount`            | Returns a list of all songs          |
| `/songs/titles`  |  `title`            | Returns a list of all titles         |
| `/songs/artists` |  `artist`           | Returns a list of all artists        |
| `/songs/ranks` |  `rank, start, end`   | Returns a list of rank related data  | 

Query Params
============
To add query params to a request, follow this format: `/endpoint/?param1=param1-name&param2=param2-name`

Querying resources with spaces (e.g song name and artist) should use dashes in place of the spaces.
Example: `/songs/artists/?artist=artist-name`

| Param    | Type      | What it does                                                               |
|----------|-----------|----------------------------------------------------------------------------|
| `amount` | `integer` | `Specifies how many songs to query`                                        |
| `title`  | `string`  | `Specifies a name of a song to query`                                      |
| `artist` | `string`  | `Specifies an artist whose songs to query`                                 |
| `rank`   | `integer` | `Specifies the rank of a song to query`                                    |
| `start`  | `integer` | `Specifies start of query range when querying for a range of songs`        |
| `end`    | `integer` | `Specifies start of query range when querying for a range of songs`        |

**Note that start and end query paramters must both be used together in order to hit a valid endpoint**