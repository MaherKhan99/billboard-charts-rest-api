const axios = require('axios');

const url = "https://www.billboard.com/charts/hot-100";

axios(url)
    .then(response => {
        console.log(response.data);
    })
    .catch(console.error);