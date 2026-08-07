const mongoose = require('mongoose')

const requestSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'user'
    },

    requestedRole: {
        type: String,
        enum: ['artist'],
        default: 'artist'
    },

    requestDescription: {
        type: String,
        required: true,
        trim: true
    },

    requestStatus: {
        type: String,
        enum: ['Pending', 'Approved', 'Rejected'],
        default: 'Pending'
    },
    isChecked : {
        type:Boolean,
        default:false
    }

},

    {
        timestamps: true
    }
)

module.exports = mongoose.model('ArtistRequest', requestSchema)