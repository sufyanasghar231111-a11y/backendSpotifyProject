const mongoose=require('mongoose')

const albumModel= new mongoose.Schema({
    title:{
        type:String,
        required:true
    },

    album:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'music',
        default:[]
    }],
    artist:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    image:{
        type:String,
        default:''
    }
}
,{
    timestamps:true
}
)



const modelExport= mongoose.model('album', albumModel)
module.exports=modelExport