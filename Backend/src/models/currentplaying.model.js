const mongoose=require('mongoose')

const currentPlaying=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    music:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"music"
    },
    currentTime:{
        type:Number,
        default:0
    },
    duration:{
        type:Number,
        default:0
    }
})

module.exports=mongoose.model('current', currentPlaying)