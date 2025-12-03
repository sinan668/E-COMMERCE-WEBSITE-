const mongoose = require('mongoose')
const Product = require('./Product')

const wishlistScheema = new mongoose.Schema({
    
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
      },
    
      items: [
        {
          productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true
          }
        }
      ]
    }, { timestamps: true })
    
    
module.exports = mongoose.model('wishlist',wishlistScheema)