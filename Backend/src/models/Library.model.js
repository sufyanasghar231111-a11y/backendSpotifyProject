const mongoose=require('mongoose')

const librarySchema=new mongoose.Schema({
    music:[
       {
         type:mongoose.Schema.Types.ObjectId,
        ref:'music'
       }
    ],
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    }
})


module.exports=mongoose.model('lib', librarySchema)