const express = require('express');
const router = express.Router();
const AvailableServices = require('../controllers/availableServices.controller');
const JWT = require('../middleware/auth').verifyToken

router.get('/getAvailableServices', JWT, AvailableServices.getAvailableServices);


module.exports = router;