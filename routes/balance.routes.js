const express = require('express');
const router = express.Router();
const Balance = require('../controllers/balance.controller');
const JWT = require('../middleware/auth').verifyToken

router.get('/getBalance', JWT, Balance.getBalance);


module.exports = router;