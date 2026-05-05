const mongoose=require('mongoose')

const favSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },

    favorite:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'music'
    }]
})

module.exports=mongoose.model('favorite', favSchema)