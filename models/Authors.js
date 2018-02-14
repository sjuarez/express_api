var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AuthorsSchema = Schema({
  _id: Schema.Types.ObjectId,
  first_name: String,
  last_name: String
});


module.exports = mongoose.model('Authors', AuthorsSchema);