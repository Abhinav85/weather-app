const axios = require('axios');
const express = require('express');
const fs = require('fs');
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const {location} = require('./models/locationsSearched');
const {user} = require('./models/user');
const {ObjectID} = require('mongodb');


/// Server Connection
var app = express();
app.use(express.static(__dirname + './../public'))

app.use((req,res,next) => {
    let now = new Date().toString();
    fs.appendFile('./logs/server.log',`${now} ${req.method} ${req.url} \n`,(err) => {
        fs.appendFile('./logs/serverError.log',`${now} ${req.method} ${req.url} ${err} \n`,(err) => {
            console.log('Error',err);
        })
    });
    next();
})

app.use(bodyParser.json());


app.get('/',(req,res) => {

})

app.get('/city?', (req,res) => {
    const city = req.query.city;
    var url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=edb908af227ecef60dc37cc42cacd0a4`

    
    axios({method : 'get',
        url : url,
    }).then((resp) => {
        if(resp.status === 200){

            let newLocation = new location({
                name : resp.data.name,
                coord : resp.data.coord,
                weather : resp.data.weather,
                main : resp.data.main
            })

            newLocation.save().then((doc) => {
                let now = new Date().toString();
                fs.appendFile('./logs/database.log',`${now} -   ${doc._id} - ${doc.name} \n`,(err) => {
                    fs.appendFile('./logs/databaseError.log',`${now} -  ${err} \n`, (err) => {
                        console.log(err);
                    });
                })
            },  (e) => {
                throw new Error;
            })

            res.send(JSON.stringify(resp.data));
            
        }
    }).catch((error) => {
        console.log('Error',error)
    })
})

app.post('/signUp',(req,res) => {
    let newUser = new user({
        name : req.body.name,
        password : req.body.password,
        email : req.body.email
    });

    newUser.save().then((doc) => {
        res.send({
            "message" : "User Save Successfully"
        })       
        let now = new Date().toString();
        fs.appendFile('./logs/newUser.log',`${now} - ${doc.name} - ${doc.email}\n`,(err) => {
            if(err !== null){
                res.status(400).send(err);
                console.log('Unable to enter name in the database');
            }
        })
    })
})  



app.get('/userLocation',(req,res) => {
    let userId = req.get('user-id') || '';
    if(ObjectID.isValid(userId)){
        location.find({_id : userId}).then((locations) => {
            if(locations){
            res.send({locations,isSuccess : true});
            }else{
                res.send([]);
            }
        })
    }else{
        return res.status(404).send("Wrong User ID")
    }
},err => {
    res.status(400).send(err)
})



app.listen(port, () => {
    console.log("Development Port is up", port);
});

module.exports.app = app;

