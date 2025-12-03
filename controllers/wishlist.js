const Wishlist = require('../models/wishlist')
const Product  = require('../models/Product')
const User     =require('../models/user')


exports.addWishlist = async (req,res)=>{
    try{
        
        const {userId,productId} = req.body
        
        //check from mongodb
        
        const users    = await User.findById(userId)
        const Products = await Product.findById(productId)
        
        
        if(!users){
            res.status(404).json({messege:'user not found'})
        }
        
        if(!Products){
            res.status(404).json({messege:'product not found'})
    
        }
        
        // creat to check user already have wish list
        
        let wishlist = await Wishlist.findOne({ userId:userId });
        
        
        if (!wishlist) {
          wishlist = await Wishlist.create({
            userId,
            items: [{ productId }]
          });

        } else {
        
          // Check if product already in wishlist
          const already = wishlist.items.some(
            (item) => item.productId.toString() === productId
          );
          if (already) {
            return res.status(400).json({ message: "Product already in wishlist" });
          }

          res.status(200).json({messege:'product add to wishlist succsusfuly'})
        
          wishlist.items.push({ productId });
          await wishlist.save();
        }
    }catch(error){
        res.status(400).json({message:'internel server error',error:error.message})
    }
}