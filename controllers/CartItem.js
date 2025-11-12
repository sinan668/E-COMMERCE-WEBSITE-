const cartitems = require('../models/CartItem');
const Product  = require('../models/Product');
const user = require('../models/user');


exports.addCArtItems = async(req,res)=>{
    
    try{
        
        const {productId,userId,quantity} = req.body;        
        
        
        const products = await Product.findById(productId);

        
        if(!products){
            return res.status(400).json({messege:'product not found'})
        }

        let cart = await cartitems.findOne(({userId}))
    

        if (!cart){
            cart = new cartitems({userId,items:[{productId,quantity}]})
        }else {
          const index = cart.items.findIndex((i) => i.productId.equals(productId));
           if (index > -1) cart.items[index].quantity += quantity;
           else cart.items.push({ productId, quantity });
    }
        if(!user){ 
            res.status(400).json({messege:'user not found'})
        }
        
        
    
        res.status(200).json({messege:'cart add'})

        
    }catch(error){
        
        res.status(500).json({messege:'internal server error',error:error.messege})
    }
}


