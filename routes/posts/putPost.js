var MongoClient = require('mongodb').MongoClient;
var mongoose = require('mongoose');
/* UPDATE A POSTS */
function putPost(req, res, next) { 
     MongoClient.connect("mongodb://localhost:27017", function(err, db) {
       if (err) throw err;
       var dbo = db.db("blog");
       dbo.collection("posts").update(
         { _id: mongoose.Types.ObjectId(req.body._id) },
         {
           $set: {
             title: req.body.title,
             body: req.body.body,
           }
         })
         res.json(req.body);
          db.close();    
     });
}
module.exports = putPost;