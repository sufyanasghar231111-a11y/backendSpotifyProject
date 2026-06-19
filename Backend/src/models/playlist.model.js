const mongoose=require('mongoose')

const userSchemas= new mongoose.Schema({

    name:{
        type:String,
        required:true,
        trim:true
    },
    
    music:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'music'
    }],

    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    
    visibility:{
        type:String,
        enum:['private', 'public'],
        default:'private'
    }
})

const userSchema=mongoose.model('playlist', userSchemas)
module.exports=userSchema