const express = require('express');
const router = express.Router();
const Withdrawal = require('../controllers/withdrawal.controller');
const Validator = require('../validators');
const JWT = require('../middleware/auth').verifyToken

router.post('/withdrawFunds', JWT, Validator.verifyAmount, Withdrawal.withdrawFunds);


module.exports = router;