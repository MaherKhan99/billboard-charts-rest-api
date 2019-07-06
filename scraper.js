const axios = require('axios');
const cheerio = require('cheerio');
const mongoose = require('mongoose')
const CronJob = require('cron').CronJob;
const Song = require('./models/song')
require('dotenv').config();

const url = "https://www.billboard.com/charts/hot-100";

const job = new CronJob('59 23 * * *', function () {
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
}, null, true, 'America/New_York')

module.exports = job;