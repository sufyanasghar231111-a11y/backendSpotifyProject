const mongoose=require('mongoose')

const currentPlaying=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    music:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"music"
    }
})

module.exports=mongoose.model('current', currentPlaying)