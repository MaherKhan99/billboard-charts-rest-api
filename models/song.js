const mongoose = require('mongoose')

const songSchema = new mongoose.Schema({
    title: String,
    artist: String,
    rank: Number
})

module.exports = mongoose.model("Song", songSchema)