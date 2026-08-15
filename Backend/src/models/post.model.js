const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    role: {
        type: String,
        enum: ['user', 'artist', 'admin'],
        default: "user"
    },
    isActive: {
        type:Boolean,
        default:false
    },

    pfp: {
        type: String,
        default: ''
    },

    resetToken: String,
    resetTokenExpire: Date,
    
    verified:{
        type:Boolean,
        default:false
    },

    lastActive:{
        type:Date,
        default:Date.now(),
        index:true
    },

    isOnline:{
        type:Boolean,
        default:false
    },

    artistApprovedAt:{
        type:Date,
        default:null
    },

    expiresAt:{
        type:Date,
        default:null,
        index:{expires:0}
    }

},
{
    timestamps:true
}
)


module.exports = mongoose.model('user', postSchema)