const axios = require('axios');
const cheerio = require('cheerio');
const urls = ["https://www.thegioididong.com/dtdd-apple-iphone",
            "https://www.thegioididong.com/dtdd-samsung",
            "https://www.thegioididong.com/dtdd-oppo",
            "https://www.thegioididong.com/dtdd-xiaomi",
            "https://www.thegioididong.com/dtdd-vivo",
            "https://www.thegioididong.com/dtdd-realme",
            "https://www.thegioididong.com/dtdd-vsmart",
            "https://www.thegioididong.com/dtdd-huawei",
            "https://www.thegioididong.com/dtdd-mobell",
            "https://www.thegioididong.com/dtdd-itel",
            "https://www.thegioididong.com/dtdd-masstel",
            "https://www.thegioididong.com/dtdd-blackberry",
            "https://www.thegioididong.com/dtdd-coolpad"
            ];
let phoneData = {};

const promises = urls.map(async url =>{
    //fetch Data from url
    const res = await fetchData(url);

    //find item Title on DOM by cheerio
    const $ = cheerio.load(res.data);
    const mobileItem = $('.homeproduct > .item h3')
    
    //Loop through all items and push into Object:phoneData brand by brand 
    mobileItem.each((index,item) => {
        let splitItem = item.children[0].data.split(" ")
        // Because Samsung title is Samsung Galaxy + "..."
        // So i will cut 2 brand words Samsung Galaxy
        // Instead of cut 1 brand word like the others
        let ifSamsung = (splitItem[0] == 'Samsung') ? 1 : 0 ;
        
        //push into Object
        let removeBrand = splitItem.slice(ifSamsung+1).join(" ")
        if(phoneData.hasOwnProperty(splitItem[ifSamsung])){
            phoneData[splitItem[ifSamsung]].push(removeBrand);
        }else{
            phoneData[splitItem[ifSamsung]] = [removeBrand]
        }
    })
});

Promise.all(promises).then(() => {
    console.log(phoneData);
}).catch((err) => {
    console.log(err);
});

async function fetchData(url){
    const response = await axios({
        method:'get',
        url: url,
        responseType:'json'
    }).catch((error) => {console.log(err)});
    
    if(response.status !== 200){
        console.log("Err when fetching data");
    }
    return response;
}