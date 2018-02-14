var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;

/* GET home page. */
router.get('/', function(req, res, next) {
  //res.redirect('/blog');
  res.json('Home')
});

module.exports = router;
