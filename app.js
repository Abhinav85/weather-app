// const request = require('request');
const http = require('http');
const axios = require('axios');
const port = process.env.PORT || 3000;

var city;


var server = http.createServer((req,resp) => {
    city = req.url.substring(1) 

    const header = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'OPTIONS, POST, GET',
        'Access-Control-Max-Age': 2592000,
    }
    var url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=edb908af227ecef60dc37cc42cacd0a4`
    
    axios({
        method : 'get',
        url : url,
    }).then((res) => {
        if(res.status === 200){
            console.log('The first call');
            resp.writeHead(200,header)
            resp.end(JSON.stringify(res.data));
        }
    }).catch((error) => {
        console.log('Error')
    })
})





server.listen(port, () => {
    console.log("Port is up ", port);
});