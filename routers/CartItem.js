const express = require('express');

const router = express.Router()


const {addCArtItems,getCart, deleteCart, removeOneProduct} = require('../controllers/CartItem')
const {auth}                 = require('../middleware/auth')

router.post('/addCArtItems',auth,addCArtItems)
router.get('/:id',auth,getCart)
router.delete("/:userId",auth,deleteCart);
router.delete('/:userId/product/:productId',removeOneProduct)

module.exports = router
