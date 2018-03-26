var mongoose = require('mongoose');

// refer to stocks schema for ids
var searchHistorySchema = new mongoose.Schema({
  name: String,
  date: { type: Date, default: Date.now }
})

var userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  name:String,
  password: { type: String, required: true },
  searchHistory:[searchHistorySchema]
});

mongoose.model('Users', userSchema);