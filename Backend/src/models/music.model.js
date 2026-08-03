const mongoose = require('mongoose')

const musicSchema = new mongoose.Schema({
    uri: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    artist: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    image: {
        type: String,
        default: ''
    },
    lastCreate :{
        type:Date,
        default: Date.now(),
        index :true

    }
},
    {
        timestamps: true,
    }
)



module.exports = mongoose.model('music', musicSchema)