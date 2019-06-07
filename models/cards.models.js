const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let cards = new Schema({
  pin: String,
  bank: String,
  accountNumber: String,
  cardNumber: String,
  cardType: String,
  active: Boolean,
  createdAt: {
    type : Date, 
    default: Date.now()
  }
});

module.exports = Cards = mongoose.model('cards' , cards);