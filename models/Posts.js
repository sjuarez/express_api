var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PostsSchema = Schema({
  _id: Schema.Types.ObjectId,
  author_id: { type: Schema.Types.ObjectId, ref: 'Authors' },
  title: String,
  body: String
});

/*var PostsSchema = new mongoose.Schema({
    _id: Schema.Types.ObjectId,
    author_id: [{ type: Schema.Types.ObjectId, ref: 'Authors' }],
    title: String,
    body: String
});
*/
module.exports = mongoose.model('Posts', PostsSchema);