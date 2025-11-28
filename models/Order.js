
const mongoose = require('mongoose');



const Orderschema = new mongoose.Schema({
    userId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User", 
      required: true 
    },items:{
        type:Object,
        require:true
    },totelAmount:{
        type:Number,
        // require:true
    },status:{
        type:String,
        items:['pendding','prossing','shipping','Delivered','Cancelled']
        // require:true
    },razoPayOrderId:{
        type:String,
        // require:true
    },razorpayPaymentId:{
        type:String,
        // require:true
    },shippingAddress:{
        type:Object,
        // require:true
    }
})



module.exports=mongoose.model('order',Orderschema)