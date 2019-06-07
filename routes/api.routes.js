const express = require('express');
const router = express.Router();
const cors = require('cors');

const PinRoute = require('./pinAuth.routes')
const WithdrawalRoute = require('./withdrawal.routes')
const BalanceRoute = require('./balance.routes')

router.use(cors());


router.use(WithdrawalRoute)
router.use(PinRoute);
router.use(BalanceRoute);


module.exports = router;
