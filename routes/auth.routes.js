const express = require('express');
const router = express.Router();
const cardValidation = require('../controllers/cardValidation.controller');
const Validator = require('../validators');

router.post('/verifyCard', Validator.verifyCard, cardValidation.verifyCard);


module.exports = router;