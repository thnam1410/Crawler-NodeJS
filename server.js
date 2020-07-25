const axios = require('axios')
const cheerio = require('cheerio')
const url = "https://www.thegioididong.com/dtdd"


// console.log(fetchData(url))
axios({
    method:'get',
    url:url,
    responseType:'json'
}).then((res) =>{
    const html = res.data
    const $ = cheerio.load(html)
    const mobileItem = $('.homeproduct > .item h3')
    console.log(mobileItem);
    // mobileItem.each((index,item) => {
    // })
   
}).catch((err) => {
    console.log(err)
})
// async function fetchData(url){
//     const response = await axios(url).catch((error) => {console.log(err)});
    
//     if(response.status !== 200){
//         console.log("Err when fetching data");
//     }
//     return response;
// }