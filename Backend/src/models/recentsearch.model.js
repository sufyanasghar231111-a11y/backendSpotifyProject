const mongoose=require('mongoose')

const recentsearch=mongoose.Schema({
    songs:[{
        item:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'music'
        },
        createdAt:{
            type:Date,
            default:Date.now
        }
    }],
    album:[{
        item:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'album'
        },
        createdAt:{
            type:Date,
            default:Date.now
        }
    }],
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    }
},{timestamps:true})

module.exports=mongoose.model('recentSearch', recentsearch)