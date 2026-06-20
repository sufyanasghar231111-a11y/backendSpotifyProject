const mongoose = require('mongoose')

const recentsearch = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    search: [{

        type: {
            type: String,
            enum: ['song', 'album', 'text', 'playlist']
        },

        item: {
            type: mongoose.Schema.Types.ObjectId,
            refPath: 'search.typeModel'
        },

        typeModel: {
            type: String,
            enum: ['music', 'album', 'playlist']
        },

        text: String,

        createdAt: {
            type: Date,
            default: Date.now
        }
    }]
}, { timestamps: true })

module.exports = mongoose.model('recentSearch', recentsearch)