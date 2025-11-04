const product = require('../models/Product')


//get all product in product list

exports.getAllProduct = async(req,res)=>{
    try{

        const products= await product.find()

        
        if(!products || products.length == 0){
            res.status(404).json({messge:'product not found'})
        }

        res.status(200).json({messge:'prduct find succsusfully',products})

    }catch(error){
        res.status(501).json({messge:'intrnal server error',error:error.message})
    }
}

//get product with id

exports.getProdectId = async(req,res) =>{
 
    try{
        
        const {id} = req.params;

        const productId = await product.findById(id);
        

        if(!productId){
        res.status(401).json({messge:'can not find product on this id'})
        }


         res.status(201).json({messge:'succsessfully find product',productId})

    }catch(error){
        res.status(401).json({messge:'internel server issue',error:error.message})
    }

}

//search product with name and discriotion 


exports.searchProducts = async(req,res)=>{
    try{

        const query = req.query.q
        
        if(!query){
           return res.status(400).json({messge:'please provide a search '})
        }


        const products = await product.find({
      $or: [
        { name: { $regex: query, $options: "i" } },
        { description: { $regex: query, $options: "i" } },
           ],
       });
 
       if(products.length === 0){
        return res.status(401).json({messge:'product not found'})
       }

       res.status(200).json(products)

    }catch(error){
        res.status(400).json({message:'internal server error',error:error.massage})
    }
}


// exports.creatProduct = async(req,res)=>{a


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