const express = require("express");
const app = express();
const mongoose = require('mongoose');
const Song = require('./models/song');
const job = require('./scraper.js');
require('dotenv').config();

mongoose.connect(`mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@ds345587.mlab.com:45587/billboard-chart-rest-api`, { useNewUrlParser: true })

job.start()

app.get('/songs', function (req, res) {
    const amount = req.query.amount
    const allSongs = amount ? Song.find({rank: {$lte: amount}}).sort({rank: 1}) :
        Song.find({}).sort({rank: 1})
    Song.find(allSongs, function(err, songList){
        if(err) {
            console.log(err)
        } else {
            res.json(songList)
        }
    })
})

app.get('/songs/titles', function(req, res){
    const title = req.query.title
    const allTitles = title ? Song.find({}).sort({rank: 1}) :
        Song.find({}, {title: 1}).sort({rank: 1})
    Song.find(allTitles, function(err, titles){
        if(err) {
            console.log(err)
        } else {
            if(!title) {
                res.json(titles)
            } else {
                const songArray = []
                const parsedTitle = title.replace(/-/g, ' ')
                titles.forEach(song => {
                    if (song['title'].toLowerCase().includes(parsedTitle)) {
                        songArray.push(song)
                    }
                })
                res.json(songArray)
            }
        }
    })
})

app.get('/songs/artists', function(req, res){
    const artist = req.query.artist
    const allArtists = artist ? Song.find({}).sort({rank: 1}) :
        Song.find({}, {artist: 1}).sort({rank: 1})
    Song.find(allArtists, function(err, artists){
        if(err) {
            console.log(err)
        } else {
            if(!artist) {
                res.json(artists)
            } else {
                const songArray = []
                const parsedArtist = artist.replace(/-/g, ' ')
                artists.forEach(song => {
                    if (song['artist'].toLowerCase().includes(parsedArtist)) {
                        songArray.push(song)
                    }
                })
                res.json(songArray)
            }
        }
    })
})

app.get('/songs/ranks', function(req, res){
    const rank = req.query.rank
    const firstSong = req.query.start
    const lastSong = req.query.end
    if(!rank && !firstSong && !lastSong) {
        res.send('Route does not exist')
    }
    if((firstSong && !lastSong) || (lastSong && !firstSong)) {
        res.send('Route does not exist')
    }
    const songRange = rank ? Song.find({rank}) : 
        Song.find({rank: {$gte: firstSong, $lte: lastSong}}).sort({rank: 1})
    Song.find(songRange, function(err, songs){
        if(err) {
            console.log(err)
        } else {
            res.json(songs)
        }
    })
})

app.get('*', function(req, res){
    res.send('Route does not exist');
})

app.listen(process.env.PORT || 3000, function() {
    console.log('api server has started');
});