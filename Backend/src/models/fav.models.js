const mongoose = require('mongoose')

const favSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },

    favorite: [{
        type: {
            type: String,
            enum: ['music', 'playlist', 'album']
        },
        item: {
            type: mongoose.Schema.Types.ObjectId,
            refPath: 'favorite.typeModel'
        },
        typeModel: {
            type: String,
            enum: ['music', 'playlist', 'album']
        },

        createdAt: {
            type: Date,
            default: Date.now
        }

    }
    ]
}, {
    timestamps: true
})

module.exports = mongoose.model('favorite', favSchema)