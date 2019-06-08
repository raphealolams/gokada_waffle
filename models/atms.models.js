const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let atms = new Schema({
  name: String,
  address: String,
  email: String,
  website: String
});

module.exports = Atms = mongoose.model('atms' , atms);