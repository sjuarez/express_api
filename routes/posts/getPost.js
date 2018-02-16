var MongoClient = require('mongodb').MongoClient;
var mongoose = require('mongoose');
/* GET A POST */
function getPost(req, res, next) {     

     MongoClient.connect("mongodb://localhost:27017", function(err, db) {
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
}
module.exports = getPost;