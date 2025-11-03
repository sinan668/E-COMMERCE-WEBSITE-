const User = require('../models/user')

exports.register = async(req,res)=>{
    try{
        
        const {name,password,email,role,createdAt}=req.body

        const existuser = await User.findOne({email:email})

        
        if(existuser){
            res.status(400).json({massage:'this user already exist'})
        }

        const user = new User({
            name,
            password,
            email,
            role,
            createdAt,
        })
        
        await user.save();





        res.status(201).json({message:'registration complrted successfully',user})

    }catch(errr){
        res.status(500).json({message:"iinternal server error"+errr.message})
    }
}
