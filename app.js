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

app.listen(3000, function() {
    console.log('api server has started');
});