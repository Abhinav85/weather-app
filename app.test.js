const request  = require('supertest');

const app = require('./app').app;

const expect = require('expect');

describe('#ApiTests', () => {
    it('should return a .html file', (done) => {
        request(app)
        .get('/')
        .expect(200)
        .end(done);
    })
    
    it('Should make a query to a city', (done) => {
        request(app)
        .get('/pune')
        .expect(200)
        .expect((res) => {
            expect(JSON.parse(res.text)).toInclude({'name' : 'Pune'}).toBeA('object');
        })
        .end(done)
    })
})

