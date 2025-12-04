const express = require('express')

const router = express.Router()

const {addWishlist,AllProduct} = require('../controllers/wishlist')
const { auth } = require('../middleware/auth')

router.post('/addWishlist',auth,addWishlist)
router.get('/:userId',auth,AllProduct)


module.exports = router