const mongoose = require('mongoose');
const Product = require('./Product');



const cartitemsschema = new mongoose.Schema({
    ProductId:{
        type:String,
        required:true
    },
    quantity:{
        type:Number,
        required:true
    }
})



module.exports=mongoose.model('cartitems',cartitemsschema)