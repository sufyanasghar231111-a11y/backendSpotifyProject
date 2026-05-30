const mongoose=require('mongoose')

const recentSchema=new mongoose.Schema({
      songs:[{
            type:mongoose.Schema.Types.ObjectId,
            ref:'music'
        }],

    album:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'album'
    }],
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    }
}, {timestamps:true})

const recentWatchSchema=mongoose.model('recent', recentSchema)
module.exports=recentWatchSchema