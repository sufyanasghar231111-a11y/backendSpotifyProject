const mongoose = require('mongoose')

const recentSchema = new mongoose.Schema({
    songs: [{
        item: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'music'
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    }],

    album: [{

        item: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'album',
        }
        ,
        createdAt: {
            type: Date,
            default: Date.now
        }
    }],
    
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }
}, { timestamps: true })

const recentWatchSchema = mongoose.model('recent', recentSchema)
module.exports = recentWatchSchema