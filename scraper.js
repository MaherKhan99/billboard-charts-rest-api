const axios = require('axios');
const cheerio = require('cheerio');

const url = "https://www.billboard.com/charts/hot-100";

axios.get(url)
    .then(response => {
        const chartArray = []
        const html = response.data;
        const $ = cheerio.load(html);
        const chart = $('.chart-list-item')
        const values = Object.values(chart)
        values.forEach(song => {
            if(song['attribs']) {
                chartArray.push({
                    title: song['attribs']['data-title'],
                    artist: song['attribs']['data-artist'],
                    rank: song['attribs']['data-rank']
                })
            }
        })
        console.log(chartArray)
    })
    .catch(console.error);
