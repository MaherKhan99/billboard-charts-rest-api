const express = require("express");
const app = express();
const mongoose = require('mongoose');
const Song = require('./models/song');
require('dotenv').config();

mongoose.connect(`mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@ds345587.mlab.com:45587/billboard-chart-rest-api`, { useNewUrlParser: true })

app.get('/', function(req, res) {
    res.send('hello');
    return;
})

app.get('/songs', function (req, res) {
    const allSongs = Song.find({}).sort({rank: 1})
    Song.find(allSongs, function(err, songList){
        if(err) {
            console.log(err)
        } else {
            res.json(songList)
        }
        return;
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
        return;
    })
})

app.get('/songs/ranks/:rank', function(req, res){
    Song.find({rank: req.params.rank}, function(err, song) {
        if(err) {
            console.log(err)
        } else {
            res.json(song)
        }
        return;
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
        return;
    })
})

app.get('/songs/artists/:artist', function(req, res){
    parsedArtist = req.params.artist.replace('-', ' ')
    const allSongs = Song.find({}).sort({rank: 1})
    Song.find(allSongs, function(err, songs){
        if(err){
            console.log(err)
        } else {
            songs.forEach(song => {
                if(song['artist'].toLowerCase() === parsedArtist){
                    res.json(song)
                }
            })
        }
        return;
    })
})

app.listen(3000, function() {
    console.log('api server has started');
});