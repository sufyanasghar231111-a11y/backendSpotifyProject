const postSchema = require('../models/post.model')
const albumSchema = require('../models/album.model')

async function adminCheckRole(req, res) {
    const {role} = req.query
    const user = await postSchema.findById(req.user.id)

    const getArtist = await postSchema.find({ role, verified: true, _id: { $nin: user.blockedArtists } })

    res.status(200).json({
        message: "Successful Get",
        data: getArtist.map((elem) => {
            return {
                id: elem._id,
                role: elem.role,
                isOnline:elem.isOnline
            }
        })
    })
}

async function allAlbum(req, res) {
    try {
        const getalbum = await albumSchema.find().populate('artist', 'username email').populate('album')

        res.status(200).json({
            message: "successful get all album",
            allAlbum: getalbum
        })
    }
    catch (e) {
        res.status(500).json({
            message: "The error in your request",
            error: e.message
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
        const block = await postSchema.findByIdAndUpdate(userId,
            {
                $addToSet: {
                    blockedArtists: id
                }
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
    const unblock = await postSchema.findByIdAndUpdate(userId, {
        $pull: {
            blockedArtists: id
        }
    },

        { new: true }
    )
    res.status(200).json({
        message: "Successful unblock",
        unblock
    })
}

async function blockUser(req, res) {
    try {
        const { id } = req.params;
        const userId = req.user.id

        const block = await postSchema.findByIdAndUpdate(userId, {
            $addToSet: {
                blockedArtists: id
            }
        },
            { new: true }
        )

        res.status(200).json({
            message: "Successful block",
            block: {
                blockedArtists: block.blockedArtists
            }
        })
    }
    catch (e) {
        res.status(500).json({
            message: "Error in request",
            error: e.message
        })
    }
}

async function unblockUser(req, res) {
    try {
        const { id } = req.params
        const userId = req.user.id
        const unblock = await postSchema.findByIdAndUpdate(userId, {
            $pull: {
                blockedArtists: id
            }
        },
            { new: true }
        )
        res.status(200).json({
            message: "Successful unblock user",
            unblock
        })

    }
    catch (err) {
        res.status(500).json({
            message: "Error in your request or server"
        })
    }
}

module.exports = {  adminCheckRole, allAlbum, particularAlbum, deleteArtistAlbum, blockArtist, unblockArtist, blockUser, unblockUser, unblockUser }