const mongoose=require('mongoose')

const albumModel= new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    artistName:{
        type:String,
        required:true
    },

    album:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'music'
    }],
    artist:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    }
})

const modelExport= mongoose.model('album', albumModel)
module.exports=modelExport