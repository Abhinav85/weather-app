// const http = require('http');
const axios = require('axios');
const express = require('express');
const fs = require('fs');
const port = process.env.PORT || 3000;

var app = express();
app.use(express.static(__dirname + '/public'))

app.use((req,res,next) => {
    var now = new Date().toString();
    fs.appendFile('server.log',`${now} ${req.method} \n`,(err) => {
    });
    next();
})


app.get('/',(req,res) => {

})

app.get('/:city', (req,res) => {
    const city = req.params.city;
    const header = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'OPTIONS, POST, GET',
        'Access-Control-Max-Age': 2592000,
    }
    var url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=edb908af227ecef60dc37cc42cacd0a4`

    
    axios({method : 'get',
        url : url,
    }).then((resp) => {
        if(resp.status === 200){
            res.send(JSON.stringify(resp.data));
            
        }
    }).catch((error) => {
        console.log('Error',error)
    })
})




app.listen(port, () => {
    console.log("Port is up ", port);
});

module.exports.app = app;

