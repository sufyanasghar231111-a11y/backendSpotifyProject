const mongoose=require('mongoose')

const postSchema= new mongoose.Schema({
    username:{
        type:String,
        require:true,
        unique:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true
    },
    role:{
        type:String,
        enum:['user', 'artist', 'admin'],
        default:"user"
    }
})


module.exports=mongoose.model('user', postSchema)