const Wishlist = require('../models/wishlist')
const Product  = require('../models/Product')
const User     =require('../models/user')
const { default: mongoose } = require('mongoose')


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
        
        // create to check user already have wish list
        
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


exports.AllProduct = async (req, res) => {
  try {
    let { userId } = req.params;
    
    if (mongoose.Types.ObjectId.isValid(userId)) {
      userId = new mongoose.Types.ObjectId(userId);
    } else {
      return res.status(400).json({ message: "Invalid userId format" });
    }
  
    

    // Check user exist
    const userExist = await User.find(userId);
      

    if (!userExist) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check wishlist exist + populate product details
    const wishlist = await Wishlist.findOne({ userId })
      .populate("items.productId");

    if (!wishlist || wishlist.items.length === 0) {
      return res.status(200).json({message: "No products in wishlist",products: []});
    }

    // Extract product details
    const products = wishlist.items.map(item => item.productId);

    return res.status(200).json({
      message: "All wishlist products fetched successfully",
      products
    });

  } catch (error) {
    return res.status(500).json({message: "Internal server error",error: error.message});
  }
};
