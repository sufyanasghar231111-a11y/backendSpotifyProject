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
    blockedArtists: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }],

    pfp: {
        type: String,
        default: ''
    },

    resetToken: String,
    resetTokenExpire: Date,
    
    verified:{
        type:Boolean,
        default:false
    }

})


module.exports = mongoose.model('user', postSchema)