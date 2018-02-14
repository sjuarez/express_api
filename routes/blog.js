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
        //console.log(JSON.stringify(res_join));
        res.json(res_join);
        db.close();
      });         
  }); 
});
/* INSERT A NEW POSTS */
router.post('/', function(req, res, next) {
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
  console.log(req.body);
  res.json(req.body);
});

module.exports = router;
