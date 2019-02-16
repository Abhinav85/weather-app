const request  = require('supertest');

const {app} = require('../app');

const {user} = require('./../models/user');

const expect = require('expect');

afterEach((done) => {
    user.remove({name : 'TESTSTRING'}).then(() =>{
        console.log("Test case user removed");
        done();
    })
})

describe('#ApiTests', () => {
    it('should return a .html file', (done) => {
        request(app)
        .get('/')
        .expect(200)
        .end(done);
    })
    
    it('Should make a query to a city', (done) => {
        request(app)
        .get('/city?city=pune')
        .expect(200)
        .expect((res) => {
            expect(JSON.parse(res.text)).toInclude({'name' : 'Pune'}).toBeA('object');
        })
        .end(done)
    })

    it('Should Enter a new user', (done) => {
        var name  = 'TESTSTRING';
        var password = new Date().toLocaleString();
        var email = new Date().toTimeString();

        request(app)
        .post('/signUp')
        .send({name,password,email})
        .expect(200)
        .expect((res) => {
            console.log(res.body);
            expect(res.body.message).toBe('User Save Successfully')
        })
        .end((err,res) => {
            if(err){
                return done(err);
            }
            user.find({name : name}).then((docs) => {
                expect(docs[0].name.length).toBe(name.length);
                done();
            }).catch((e) => {
                done(e);
            })
        })

    })
})

