const express = require('express')

const router = express.Router()

const {addWishlist} = require('../controllers/wishlist')
const { auth } = require('../middleware/auth')

router.post('/addWishlist',auth,addWishlist)


module.exports = router