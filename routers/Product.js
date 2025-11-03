const express = require ('express');
const router = express.Router()


const {getAllProduct} =  require('../controllers/Product');



router.get('/All-product',getAllProduct)


module.exports=router