/**
 * @author Ajilore Raphael Olamide <raphealolams@yahoo.com raphealolams@gmail.com>
 * @author Mock code to act as bank api
*/

const bcrypt = require('bcrypt')
const Cards = require('../models/cards.models')
const Account = require('../models/accounts.models')
const Services = require('../models/services.models')
const Atms = require('../models/atms.models')

const BankService = {};
let limitReached = 0, maxPinTry = 3


BankService.validateCard = async function validateCard(cardType, cardNumber, bank, pin, accountNumber) {
  let card = await Cards.findOne({bank, cardType, cardNumber, accountNumber})
  if (card){
    isPin = bcrypt.compareSync(pin, card.pin)
    if (isPin) return {
      validated: true, 
      card
    }

    limitReached += 1
    return {
      validated: false,
      card: null
    };

  }
  return {
    validated: false,
    card: null
  };
}

BankService.pinLimit = function pinLimit() {
  return {
    limitReached: limitReached === maxPinTry ? true : false,
    retry: maxPinTry - limitReached
  }
}

BankService.retrieveBalance = async function retrieveBalance(accountNumber) {
  let balance = await Account.findOne({accountNumber})
  return balance
};

BankService.handleDebit = async function handleDebit(accountNumber, acctType, amount) {
  let userBalance = await this.retrieveBalance(accountNumber)
  let {balance: { available, ledger}, accountType } = userBalance

  if (accountType.toLowerCase() === acctType.toLowerCase()){
    if (parseFloat(available) >= parseFloat(amount)) {
      let newBalance = parseFloat(available) - parseFloat(amount);
      let entries = updateLedger(available, newBalance, amount)
  
      let update = await Account.findOneAndUpdate({accountNumber}, {balance: {available: newBalance, ledger }, $push: {transactions: entries} }, {new: true})
  
  
      return {
        status: true,
        balance: update
      }
    } 
    return {
      status: false,
      balance: null
    }

  }

  return {
    status: false,
    balance: null
  }
};

BankService.getServices = async function getServices() {
  return await Services.find({})
}

BankService.getRandomBank = async function getRandomBank() {
  return await Atms.find({})
}


function updateLedger(userBalance, newBalance, amount){
  let newEntry, transactionType, difference;
  if (userBalance > newBalance) {
    transactionType = "Debit";
    difference = "-" + (userBalance - newBalance);
  }
  else if (userBalance < newBalance) {
    transactionType = "Credit";
    difference = "+" + (newBalance - userBalance).toFixed(2);
  }
  else{
    return;
  }
  newEntry = {transDate: new Date(), transType: transactionType, transDiffernce: difference, transactionAmount: amount, balance: newBalance};

  return newEntry
};


module.exports = BankService;