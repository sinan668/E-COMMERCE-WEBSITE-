const User = require('../models/user');
const jwt = require('jsonwebtoken')

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

exports.login = async (req,res) => {
    try{
        const {email,password} = req.body;

        if(!email)  {
            res.status(401).json({message:'please enter email'})
        } 
        if(!password)  {
            res.status(401).json({message:'password'})
        } 
        
        const user = await User.findOne({email:email});
        
        if(!user){
            res.status(401).json({message:'user no found'})
        }
        if (user.password !== password){
            res.status(404).json({message:"increct password please try again"})
        }

        const token = jwt.sign(
            {id:user._id,email:user.email},
            process.env.JWT_SECRET,
            {expiresIn:process.env.JWT_EXP}
        )
        
        
        
        res.status(200).json({message:'login completed succsessfull'})
    }catch(errr){
        res.status(500).json({message:'internel server error'+errr.message})
    }
}