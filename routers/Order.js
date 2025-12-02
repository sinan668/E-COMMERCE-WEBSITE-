const express = require('express')

const router = express.Router()

const {createOrder,getUserOrders,getOrderById} = require('../controllers/Order');
const {auth}  = require('../middleware/auth')

router.post('/orderProduct',auth,createOrder)
router.get('/:userId',auth,getUserOrders)
router.get('/:orderId',auth,getOrderById)


module.exports = router