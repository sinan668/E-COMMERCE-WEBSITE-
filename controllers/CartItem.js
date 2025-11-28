const cartitems = require('../models/CartItem');
const Product  = require('../models/Product');
const user    = require('../models/user')
const mongoose=require("mongoose");


exports.addCArtItems = async(req,res)=>{
    
    try{
        
        const {productId,userId,quantity} = req.body;        
        
        
        
        const products = await Product.findById(productId);
        const users    = await user.findById(userId)
        
        if(!products){
            return res.status(400).json({messege:'product not found'})
        }
        if(!users){
            return res.status(400).json({messege:'user not found'})
        }

        let cart = await cartitems.findOne({userId:userId})
    

        if (!cart){
            cart = new cartitems({userId,items:[{productId,quantity}]})
        }else {
          const index = cart.items.findIndex((i) => i.productId.equals(productId));
           if (index > -1) cart.items[index].quantity += quantity;
           else cart.items.push({ productId, quantity });
        }
        
        await cart.save()
        res.status(200).json({messege:'cart add',cart})

    }catch(error){
        
        res.status(500).json({messege:'internel server error',error:error.messege})
    }
}



exports.getCart = async (req, res) => {
  try {
    const userId = req.params.id;

    // Get cart document
    
    const Cart = await cartitems.findOne({ userId :userId });

    
    if (!Cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    // Build response manually without populate
    const cartWithProducts = [];

    for (const item of Cart.items) {
      const product = await Product.findById(item.productId).select("name price imageUrl");

      if (product) {
        cartWithProducts.push({
          product: product,
          quantity: item.quantity
        });
      }
    }

    res.status(200).json({
      userId,
      items: cartWithProducts
    });

  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message
    });
  }
};


exports.deleteCart = async (req, res) => {
  try {
    const { userId } = req.params;

    const deletedCart = await cartitems.findOneAndDelete({ userId });

    if (!deletedCart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    res.status(200).json({ message: "Cart deleted successfully" });
    
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};




exports.removeOneProduct = async (req, res) => {
  try {
    const { userId, productId } = req.params;

    const updatedCart = await cartitems.findOneAndUpdate(
      { userId: new mongoose.Types.ObjectId(userId) }, // find user's cart
      {
        $pull: { 
          items: { productId: new mongoose.Types.ObjectId(productId) }  // remove matching product
        }
      },
      { new: true } // return updated document
    );

    if (!updatedCart) {
      return res.status(404).json({ message: "Cart or product not found" });
    }

    res.status(200).json({
      message: "Product removed from cart successfully",
      updatedCart,
    });

  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};
