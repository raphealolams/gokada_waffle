const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let accounts = new Schema({
  accountNumber: String,
  accountName: String,
  accountType: String,
  balance: {
    available: String,
    ledger: String
  },
  transactions: Array,
  createdAt: {
    type : Date, 
    default: Date.now()
  },
  updateAt: Date
});

module.exports = Accounts = mongoose.model('accounts' , accounts);