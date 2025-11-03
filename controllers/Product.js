const product = require('../models/Product')




exports.getAllProduct = async(req,res)=>{
    try{

        const products= await product.find()

        
        if(!products || products.length == 0){
            res.status(404).json({messge:'product not found'})
        }

        res.status(200).json({messge:'prduct find succsusfully',products})

    }catch(error){
        res.status(501).json({messge:'intrnal server error'})
    }
}


// exports.creatProduct = async(req,res)=>{


//     const  {name,description,price,slge,stock,category,imageUrl,isPublished,sellerId}=req.body





//     const Product = new product({
//         name,
//         description,
//         price,
//         slge,
//         stock,
//         category,
//         imageUrl,
//         isPublished,
//         sellerId
//     })

//     await Product.save()

//     res.status(201).json({messge:'new product add succsusfully completed'});


// }