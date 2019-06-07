const Transformer = require('../utils/transformer.utils');
const ErrorResponse = Transformer.errorResponse

const Validator = {};

Validator.verifyCard = function verifyCard(req, res, next) {
  req.checkBody('pin', 'Pin is required').notEmpty().isPrototypeOf(Number);
  req.checkBody('bank', 'Bank is required').notEmpty().isPrototypeOf(String);
  req.checkBody('accountNumber', 'Account Number is required').notEmpty().isPrototypeOf(Number);
  req.checkBody('cardType', 'Card Type is required').notEmpty().isPrototypeOf(String);
  req.checkBody('cardNumber', 'Card Number is required').notEmpty().isPrototypeOf(Number);


  const errors = req.validationErrors();
  if (errors) {
    return res.status(400).json(ErrorResponse(400, "USR_02", errors[0].msg)).end()
  }

  return next();
}


Validator.verifyAmount = function verifyAmount(req, res, next) {
  req.checkBody('amount', 'Amount is required').notEmpty().isPrototypeOf(Number);

  const errors = req.validationErrors();
  if (errors) {
    return res.status(400).json(ErrorResponse(400, "USR_02", errors[0].msg)).end()
  }

  return next();
}

module.exports = Validator;
