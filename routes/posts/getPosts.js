var MongoClient = require('mongodb').MongoClient;
/* GET ALL POSTS */
function getPosts(req, res) {

     MongoClient.connect("mongodb://localhost:27017", function(err, db) {
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
          res.json(res_join);
          
          db.close();
     });         
     });           
}
module.exports = getPosts;