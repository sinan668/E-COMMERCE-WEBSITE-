const express = require('express');

const router = express.Router()


const {addCArtItems} = require('../controllers/CartItem')


router.post('/addCArtItems',addCArtItems)


module.exports = router
