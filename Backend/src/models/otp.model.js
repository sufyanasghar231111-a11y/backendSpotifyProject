const mongoose=require('mongoose')

const otpSchema= new mongoose.Schema({

    otpHash:{
        type:String,
        required:[true, 'otp is required']
    },

    email:{
        type:String,
        required:[true, 'Email is required']
    },

    user:{
        type:String,
        required:[true, 'User is required'],
        ref:'user'
    }

})

module.exports=mongoose.model('otp', otpSchema)