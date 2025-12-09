const express = require('express')

const router = express.Router()

const {addWishlist,AllProduct,deleteProduct} = require('../controllers/wishlist')
const { auth } = require('../middleware/auth')

router.post('/addWishlist',auth,addWishlist)
router.get('/:userId',auth,AllProduct)
router.delete('/delete',auth,deleteProduct)

module.exports = router