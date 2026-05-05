const mongoose=require('mongoose')

const userSchemas= new mongoose.Schema({

    name:{
        type:String,
        required:true
    },
    
    music:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'music'
    }],

    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    }
})

const userSchema=mongoose.model('playlist', userSchemas)
module.exports=userSchema