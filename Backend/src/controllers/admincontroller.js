const postSchema = require('../models/post.model')
const albumSchema = require('../models/album.model')
const playlistSchema = require('../models/playlist.model')
const musicSchema = require("../models/music.model")

async function adminCheckRole(req, res) {
    const { role, page } = req.query
    const limit = 8
    const skip = (page - 1) * limit
    const user = await postSchema.findById(req.user.id)
    const query = {
        verified: true
    }
    if (role) {
        query.role = role
    }

    const getArtist = await postSchema.find(query).sort({ createdAt: -1 })
        .limit(limit)
        .skip(skip)

    res.status(200).json({
        message: "Successful Get",
        data: getArtist.map((elem) => {
            return {
                id: elem._id,
                role: elem.role,
                isOnline: elem.isOnline,
                username: elem.username,
                email: elem.email,
                role: elem.role,
                pfp: elem.pfp,
                verified: elem.verified,
                isOnline: elem.isOnline,
                lastActive: elem.lastActive,
                isActive: elem.isActive,
                createdAt: elem.createdAt,
                artistApprovedAt:elem.artistApprovedAt
            }
        })
    })
}

async function totalRoleCount(req, res) {
    try {
        const { role } = req.query
        const query = {
            verified: true
        }
        if (role) {
            query.role = role
        }

        const totalCount = await postSchema.countDocuments(query)
        res.status(200).json({
            message: "Successful get",
            totalCount
        })
    }
    catch (err) {
        res.status(500).json({
            message: "Internal Error"
        })
    }
}

async function totalContent(req, res) {
    try {
        const [music, album, playlist] = await Promise.all([
            musicSchema
                .find().sort({ createdAt: -1 })
                .select('_id uri title artist image')
                .populate('artist', '_id username pfp isOnline')
            ,
            albumSchema
                .find().sort({ createdAt: -1 }).populate('artist', '_id username pfp isOnline')
            ,
            req.user.role === 'admin' ?
                playlistSchema
                    .find().sort({ createdAt: -1 }).populate('user', '_id username pfp isOnline')
                :
                playlistSchema.find({ user: req.user.id }).sort({ createdAt: -1 })

        ])

        res.status(200).json({
            message: "Successful get",
            music, album, playlist
        })

        res.status(200).json({
            message: "successful get all album",
        })
    }
    catch (e) {
        res.status(500).json({
            message: "The error in your request",
            error: e.message
        })
    }
}

async function totalCount(req, res) {
    try {
        const album = await albumSchema.countDocuments()
        const playlist = await playlistSchema.countDocuments()
        const music = await musicSchema.countDocuments()
        res.status(200).json({
            message: "Successful get ",
            album, playlist, music
        })
    }
    catch (err) {
        res.status(500).json({
            message: "Internal error",
            error: err.message
        })
    }
}

async function particularAlbum(req, res) {

    try {

        let { id } = req.params
        const getParticularAlbum = await albumSchema.find({ artist: id }).populate('album', 'uri title').populate('artist', 'username email')

        res.status(200).json({
            message: "Successful get particular album",
            data: getParticularAlbum
        })
    }
    catch (err) {
        res.status(500).json({
            message: "Error in your request"
        })
    }
}

async function deleteArtistAlbum(req, res) {
    try {
        let { dataId, albumId } = req.params
        const deleteMusic = await albumSchema.findByIdAndUpdate(dataId, {
            $pull: {
                album: albumId
            }
        },
            { returnDocument: 'after' }
        )

        res.status(200).json({
            message: "Successful delete music",
            deleteMusic
        })
    }
    catch (e) {
        res.status(500).json({
            message: "Error in your request or server"
        })
    }
}

async function blockArtist(req, res) {
    try {
        let userId = req.user.id
        let { id } = req.params
        const block = await postSchema.findByIdAndUpdate({ userId, _id: id },
            {
                isActive: false,
                isOnline:false
            },
            { new: true }
        )

        res.status(200).json({
            message: "successfull block",
            block
        })
    }
    catch (err) {
        res.status(500).json({
            message: "Error in your server or request",
            error: err.message
        })
    }
}

async function unblockArtist(req, res) {
    let userId = req.user.id
    let { id } = req.params
    const unblock = await postSchema.findByIdAndUpdate({ userId, _id: id }, {
        isActive: true
    },

        { new: true }
    )
    res.status(200).json({
        message: "Successful unblock",
        unblock
    })
}



module.exports = { adminCheckRole, totalContent, particularAlbum, deleteArtistAlbum, blockArtist, unblockArtist, totalCount, totalRoleCount }