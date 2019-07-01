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
            res.send(songList)
        }
    })
})

app.get('/songs/:rank', function(req, res){
    Song.find({rank: req.params.rank}, function(err, song) {
        if(err) {
            console.log(err)
        } else {
            res.send(song)
        }
    })
})

app.get('/songs/:startRank/:endRank', function(req, res){
    const firstSong = req.params.startRank
    const lastSong = req.params.endRank
    const songRange = Song.find({rank: {$gte: firstSong, $lte: lastSong}}).sort({rank: 1})
    Song.find(songRange, function(err, songs){
        if(err) {
            console.log(err)
        } else {
            res.send(songs)
        }
    })
})

app.listen(3000, function() {
    console.log('api server has started');
});