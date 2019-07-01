const express = require("express");
const app = express();
const mongoose = require('mongoose');
const Song = require('./models/song');
require('dotenv').config();

mongoose.connect(`mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@ds345587.mlab.com:45587/billboard-chart-rest-api`, { useNewUrlParser: true })

app.get('/', function(req, res) {
    res.send('hello');
})

app.get('/songs', function (req, res) {
    const allSongs = Song.find({}).sort({rank: 1})
    Song.find(allSongs, function(err, songList){
        if(err) {
            console.log(err)
        } else {
            res.json(songList)
        }
    })
})

app.get('/songs/titles', function(req, res){
    const allTitles = Song.find({}, {title: 1}).sort({rank: 1})
    Song.find(allTitles, function(err, titles){
        if(err) {
            console.log(err)
        } else {
            res.json(titles)
        }
    })
})

app.get('/songs/artists', function(req, res){
    const allArtists = Song.find({}, {artist: 1}).sort({rank: 1})
    Song.find(allArtists, function(err, artists){
        if(err) {
            console.log(err)
        } else {
            res.json(artists)
        }
    })
})


app.get('/songs/ranks/:rank', function(req, res){
    Song.find({rank: req.params.rank}, function(err, song) {
        if(err) {
            console.log(err)
        } else {
            res.json(song)
        }
    })
})

app.get('/songs/ranks/:startRank/:endRank', function(req, res){
    const firstSong = req.params.startRank
    const lastSong = req.params.endRank
    const songRange = Song.find({rank: {$gte: firstSong, $lte: lastSong}}).sort({rank: 1})
    Song.find(songRange, function(err, songs){
        if(err) {
            console.log(err)
        } else {
            res.json(songs)
        }
    })
})

app.get('/songs/titles/:title', function(req, res){
    parsedTitle = req.params.title.replace(/-/g, ' ')
    const allSongs = Song.find({}).sort({rank: 1})
    Song.find(allSongs, function(err, songs){
        if(err){
            console.log(err)
        } else {
            const titleArray = []
            songs.forEach(song => {
                if(song['title'].toLowerCase().includes(parsedTitle)){
                    titleArray.push(song)
                }
            })
            res.json(titleArray)
        }
    })
})

app.get('/songs/artists/:artist', function(req, res){
    parsedArtist = req.params.artist.replace(/-/g, ' ')
    const allSongs = Song.find({}).sort({rank: 1})
    Song.find(allSongs, function(err, songs){
        if(err){
            console.log(err)
        } else {
            const artistArray = []
            songs.forEach(song => {
                if(song['artist'].toLowerCase().includes(parsedArtist)){
                    artistArray.push(song)
                }
            })
            res.json(artistArray)
        }
    })
})

app.listen(3000, function() {
    console.log('api server has started');
});