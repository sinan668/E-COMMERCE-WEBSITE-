const jwt = require ('jsonwebtoken')

require('dotenv').config();


const auth = (req,res,next)=>{
    try{
        const authHead = req.headers['authorization']

        if(!authHead){
            return req.status(400).json({messge:'No token found'})
        }

        const decoded = jwt.verify(token,process.env.JWT_SECRET || process.env.JWT_EXP)

        req.user = decoded

        next()
    }catch(error){
        req.status(400).json({messge:'inter server error',error:error.messge})
    

    }
}

module.exports = auth;