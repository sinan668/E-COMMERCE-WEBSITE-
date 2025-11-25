const express = require('express');

const router = express.Router()


const {addCArtItems,getCart} = require('../controllers/CartItem')
const {auth}                 = require('../middleware/auth')

router.post('/addCArtItems',auth,addCArtItems)
router.get('/:id',auth,getCart)

module.exports = router
