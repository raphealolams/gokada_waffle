const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let services = new Schema({
  available: String,
  createdAt: {
    type : Date, 
    default: Date.now()
  }
});

module.exports = Services = mongoose.model('services' , services);