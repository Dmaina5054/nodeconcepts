const axios = require('axios');
const logger =  require('../ttpoint/dummy/logger');

axios.get('https://www.reddit.com/r/programming.json')
    .then((response)=>{
       console.log(response.data)
       var lo = new logger()
       
       console.log(lo.log())

    })
    .catch((error) =>{
        console.error(error);
    })
    