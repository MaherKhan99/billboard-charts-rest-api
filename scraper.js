const axios = require('axios');
const cheerio = require('cheerio');
const mongoose = require('mongoose')
const Song = require('./models/song')
require('dotenv').config();

const url = "https://www.billboard.com/charts/hot-100";
mongoose.connect(`mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@ds345587.mlab.com:45587/billboard-chart-rest-api`, { useNewUrlParser: true })

axios.get(url)
    .then(response => {
        const html = response.data;
        const $ = cheerio.load(html);
        const chart = $('.chart-list-item')
        const values = Object.values(chart)
        Song.deleteMany({}, () => console.log('deleted songs'))
        values.forEach(song => {
            if(song['attribs']) {
                Song.create({
                    title: song['attribs']['data-title'],
                    artist: song['attribs']['data-artist'],
                    rank: song['attribs']['data-rank']
                })
            }
        })
        console.log('Successful scrape!')
    })
    .catch(console.error);
