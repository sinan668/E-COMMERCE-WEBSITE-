const express = require('express')

const router = express.Router()

const {createOrder,getUserOrders} = require('../controllers/Order');
const {auth}  = require('../middleware/auth')

router.post('/orderProduct',auth,createOrder)
router.get('/:userId',auth,getUserOrders)

module.exports = router