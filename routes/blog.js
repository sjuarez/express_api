var express = require('express');
var router = express.Router();

var getPosts = require('./posts/getPosts');
var getPost = require('./posts/getPost');
var addPost = require('./posts/addPost');
var putPost = require('./posts/putPost');

var url = "mongodb://localhost:27017";

router.get('/', getPosts);
router.get('/post/:id', getPost);
router.post('/', addPost);
router.put('/', putPost);

module.exports = router;
