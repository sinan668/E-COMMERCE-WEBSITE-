const express = require('express')

const router = express.Router()

const {createOrder} = require('../controllers/Order');
const {auth}  = require('../middleware/auth')

router.post('/orderProduct',auth,createOrder)


module.exports = router