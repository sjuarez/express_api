var chai = require('chai');
var chaiHttp = require('chai-http');
var app = require('../app');
var should = chai.should();
var expect = chai.expect;
chai.use(chaiHttp);

/**
* Test the following in on scoop:
*/
describe('API', function() {
     // ...
     describe('/get', function() {
       it('Set Auth, responds with status 200 and return an Array', function(done) {
          chai.request(app)
          .get('/blog')
          .auth('J3J+?!Ux{y]"{d2', 'U*uCem;/raWG8by&')
          .end(function(err, res) {                 
               expect(res).to.have.status(200);
               should.exist(res.body);
               res.body.should.be.a('Array');                 
               done();
          });
       });
     });
     describe('/get/post', function() {
          it('Set Auth, GET a Post', function(done) {
             chai.request(app)
             .get('/blog/post/5a80dd65c1ae923180a9e844')
             .auth('J3J+?!Ux{y]"{d2', 'U*uCem;/raWG8by&')
             .end(function(err, res) {                 
                  expect(res).to.have.status(200);
                  should.exist(res.body);
                  res.body.should.be.a('Array');                 
                  done();
             });
          });
     });
     describe('/put', function() {
          it('Set Auth, PUT a Post', function(done) {
             chai.request(app)
             .put('/blog')             
             .send({ _id: '5a80dd65c1ae923180a9e844', title: '123', body: '123' })
             .auth('J3J+?!Ux{y]"{d2', 'U*uCem;/raWG8by&')
             .end(function (err, res) {
               expect(err).to.be.null;
               expect(res).to.have.status(200);
               done();
            });
          });
     });
     describe('/post', function() {
          it('Set Auth, ADD a Post', function(done) {
             chai.request(app)
             .post('/blog')             
             .send({ author_id: '5a80dcfcc1ae923180a9e843', title: 'CHAI TESTING', body: 'CHAI TESTING' })
             .auth('J3J+?!Ux{y]"{d2', 'U*uCem;/raWG8by&')
             .end(function (err, res) {
               expect(err).to.be.null;
               expect(res).to.have.status(200);
               done();
            });
          });
     });               
});
