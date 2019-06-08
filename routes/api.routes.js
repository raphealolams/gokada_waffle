const express = require('express');
const router = express.Router();
const cors = require('cors');

const AuthRoute = require('./auth.routes')
const WithdrawalRoute = require('./withdrawal.routes')
const BalanceRoute = require('./balance.routes')
const SerivcesRoute = require('./services.routes')

router.use(cors());


router.use(WithdrawalRoute)
router.use(AuthRoute);
router.use(BalanceRoute);
router.use(SerivcesRoute);


module.exports = router;
