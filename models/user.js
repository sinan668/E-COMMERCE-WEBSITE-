const mongoose = require('mongoose');



const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Please enter your name']
    },
    password:{
        type:String,
        minLength:[8,'enter Atleast 8 number'],
        required:[true,'please enter a password']
    },
    email:{
        type: String,
        required: [true, "Please prrovide an email"],
        unique: [true, "This email already exists"],
        match: [/^\S+@\S+\.\S+$/, "Please provide a valid email"]
    },
    role:{
        type:String,
        enum: {
            values: ['customer', 'admin'],
            message: '{VALUE} is not supported'
        },
        default: 'customer',
        required:[true,'select your role'],
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('user',userSchema)