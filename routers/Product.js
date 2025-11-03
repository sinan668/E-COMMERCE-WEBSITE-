const express = require ('express');
const router = express.Router()


const {getAllProduct} =  require('../controllers/Product');
const {getProdectId}  = require('../controllers/Product')


router.get('/All-product',getAllProduct)
router.get('/:id',getProdectId)



module.exports=router