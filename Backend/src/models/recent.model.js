const mongoose=require('mongoose')

const recentSchema=new mongoose.Schema({
    music:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'music'
    }],
    album:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'album'
    }]
}, {timestamps:true})

module.exports=mongoose.model('recent', recentSchema)