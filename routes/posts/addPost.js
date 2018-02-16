var MongoClient = require('mongodb').MongoClient;
var mongoose = require('mongoose');
/* GET A POST */
function addPost(req, res, next) {    
     /* INSERT A NEW POSTS */   
     MongoClient.connect("mongodb://localhost:27017", function(err, db) {
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
}
module.exports = addPost;