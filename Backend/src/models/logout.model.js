const mongoose=require('mongoose')

const logoutSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },

    refreshTokenHash:{
        type:String,
        required:[true, ' refresh token Hash is required']
    },

    ip:{
        type:String,
        required:[true, ' ip is required']
    },

    userAgent: {
        type:String,
        required:[true, 'useragent is required']
    },

    revoke: {
        type:Boolean,
        default:false
    }
})

module.exports=mongoose.model('logout', logoutSchema)