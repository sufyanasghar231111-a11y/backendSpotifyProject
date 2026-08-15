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
    },
    expiresAt:{
        type:Date,
        required: true,
        index: {expires: 0}
    }

})

module.exports=mongoose.model('otp', otpSchema)