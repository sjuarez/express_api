var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var mongoose = require('mongoose');
var Posts = require('../models/Posts.js');
var Author = require('../models/Authors.js');
var Schema = mongoose.Schema;

var url = "mongodb://localhost:27017";

/* GET ALL POSTS */
router.get('/', function(req, res, next) {
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("blog");
    dbo.collection('posts').aggregate([
      { $lookup:
         {
           from: 'authors',
           localField: 'author_id',
           foreignField: '_id',
           as: 'author'
         }
       }
      ]).toArray(function(err, res_join) {
        if (err) throw err;
        console.log('DEL GET!');
        
        console.log(req.headers.authorization);
        //console.log(res);
        res.json(res_join);
        db.close();
      });         
  }); 
});
/* GET A POST */
router.get('/post/:id', function(req, res, next) {

  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("blog");
    dbo.collection('posts').aggregate([
      { "$match": { "_id": mongoose.Types.ObjectId(req.params.id) } },
      { "$lookup": {
        "localField": "author_id",
        "from": "authors",
        "foreignField": "_id",
        "as": "author"
      } }
      ]).toArray(function(err, res_join) {
        if (err) throw err;
        res.json(res_join);
        db.close();
      });         
  });
});
/* INSERT A NEW POSTS */
router.post('/', function(req, res, next) {
  console.log('DEL POST!!!!');
  
  console.log(req.headers.authorization);

  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("blog");
    var insertObj={
      author_id:mongoose.Types.ObjectId(req.body.author_id),
      title:req.body.title,
      body:req.body.body,
      date:new Date().getTime()      
    }
    dbo.collection("posts").insertOne(insertObj, function(err, res) {
      if (err) throw err;
      console.log("1 document inserted");
      db.close();
    });
  });
  res.json(req.body);
});
/* UPDATE A POSTS */
router.put('/', function(req, res, next) {
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("blog");
    dbo.collection("posts").update(
      { _id: mongoose.Types.ObjectId(req.body._id) },
      {
        $set: {
          title: req.body.title,
          body: req.body.body,
        }
      }).then(function(res){
         console.log('success!');
         }, response => {
           // error callback
           console.log(response);
         });
         db.close();    

  });
  console.log('Im the server');
  console.log(req.body);
  res.json(req.body);
});

module.exports = router;
