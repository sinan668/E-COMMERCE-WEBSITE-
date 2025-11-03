const mongoose = require('mongoose');


const productShema = new mongoose.Schema({
 
    name:{
        type:String,
        required:[true,'please name of product']
    },
    description:{
        type:String,
        required:[true,'please provide a discription']

    },
    price:{
        type:Number,
        required:[true,'please provide price of it']
    },
    slge:{
        type:String,
        required:true
    },
    stock:{
        type:Number,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    imageUrl:{
        type:String,
        required:true
    },
    isPublished:{
        type:Boolean,
        required:true
    },
    sellerId:{
        type:String,
        required:true
    }
})

module.exports=mongoose.model('product',productShema)