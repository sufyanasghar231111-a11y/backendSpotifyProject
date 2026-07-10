const userSchema = require('../models/playlist.model')
const mongoose = require('mongoose')
const favSchema = require('../models/fav.models')
const musicSchema = require('../models/music.model')
const postSchema=require('../models/post.model')
const uploadPfp= require('../services/playlist.service')

async function playlist(req, res) {

    try {
        const { name, music, user } = req.body || {}
        const imageUrl = ''
        if(req.file){
            const result = await uploadPfp(req.file.buffer)
            imageUrl = result.url
        }
        const createPlaylist = await userSchema.create({
            name,
            music: [],
            user: req.user.id,
            playlistPic:imageUrl
        })

        res.status(201).json({
            message: "Successful create playlist",
            createPlaylist,
            user: req.user.id
        })
    }
    catch (e) {
        res.status(500).json({

            message: "Error in playist",
            error: e.message
        })
    }
}

async function particularUserPlaylist(req, res) {

    try {
        const particular = await userSchema.find({ user: req.user.id }).populate('music', 'title uri').populate('user')
        res.status(200).json({
            message: "successful get playlist",
            particular
        })
    }
    catch (err) {
        res.status(500).json({
            message: "Error in particularUser"
        })
    }
}

async function separate(req, res) {
    try {
        let { id } = req.params

        const getSinglePlaylist = await userSchema.findOne({ _id: id, user: req.user.id }).populate('user').populate('music')

        res.status(200).json({
            message: 'Successful get Music',
            getSinglePlaylist
        })
    }
    catch (err) {
        res.status(500).json({
            message: "Error in your response"
        })
    }
}

async function visibilityPlaylist(req, res) {
    try {
        const { id } = req.params
        const visible = await userSchema.findById(id).populate({ path: 'music', populate: { path: "artist", select: 'username _id' } }).populate({ path: "user", select: "username _id" })
        if (!visible) {
            return res.status(404).json({
                message: 'Playlist not found'
            })
        }
       

        if (visible.user._id.toString() !== req.user.id.toString()) {
            return res.status(403).json({
                message: 'You are not authorized to update this playlist'
            })
        }

        visible.visibility =
            visible.visibility === 'public' ? 'private' : 'public'

        await visible.save()

        res.status(200).json({
            message: "successfull make it public or private",
            visible
        })
    }
    catch (err) {
        res.status(500).json({
            message: "Error in your Response",
            error: err.message
        })
    }
}

async function getParticulatVisible(req,res){
    try{
        const {id}=req.params
        const user= await postSchema.findById(id).select('username _id pfp')
        if(!user){
            return res.status(404).json({
                message:"User not found"
            })
        }
        const particularVisible = await userSchema.find({ user:id,  visibility:'public'}).populate({path:"user", select:"username _id pfp "})
        res.status(200).json({
            message:"successful get",
            particularVisible,
            user
        })
    }
    catch(err){
        res.status(500).json({
            message:"Internal error",
            error:err.message
        })
    }
}

async function updateName (req, res) {
    try{
        const {name} = req.body
        const {id} = req.params
        const result = await uploadPfp(req.file.buffer)
        console.log(result);
        
        const updateData= await userSchema.findByIdAndUpdate(
            {user:req.user.id, _id:id},
            {
             playlistPic:result.url,
             name   
            }
        )

        res.status(200).json({
            message:"successful update",
            updateData
        })
    }
    catch(err){
        res.status(500).json({
            message:"Internal error",
            error:err.message
        })
    }
}

async function deletePlaylistComplete(req, res) {
    try {
        let { id } = req.params
        const deletePlatlist = await userSchema.deleteOne({ _id: id, user: req.user.id })
        res.status(200).json({
            message: "Successful delete",
            deletePlatlist
        })

    }
    catch (err) {
        res.status(500).json({
            message: "Error in your response",
            error: e.message
        })
    }
}

async function deleteMusic(req, res) {
    try {
        const { particularId, musicId } = req.params
        const deleteParticularMusic = await userSchema.findByIdAndUpdate(particularId, {
            $pull: {
                music: new mongoose.Types.ObjectId(musicId)

            }
        },

            { returnDocument: 'after' }
        ).populate('music')

        res.status(200).json({
            message: "Successful delete Music",
            deleteParticularMusic
        })
    }
    catch (err) {
        res.status(500).json({
            message: "the server encouter an unexpected condition",
            error: err.message
        })
    }
}

async function pushMusic(req, res) {
    try {
        const { particularId, musicId } = req.params

        if (!particularId || !musicId) {
            res.status(400).json({
                message: "Field required or missing "
            })
        }

        const update = await userSchema.findByIdAndUpdate(
            { _id: particularId, user: req.user.id }
            ,
            {
                $addToSet: {
                    music: musicId
                }
            },
            { new: true }
        ).populate({ path: 'music', populate: { path: 'artist' } })
        res.status(200).json({
            message: "Successfull update Music",
            update
        })
    }
    catch (err) {
        res.status(500).json({
            message: "the server encouter an unexpected condition",
            error: err.message
        })
    }
}

async function getSingleMusic(req, res) {
    try {

        const { particularId, musicId } = req.params
        const findMusic = await userSchema.findOne(
            {
                _id: particularId,
                user: req.user.id
            }
        ).populate('music')

        const singleMusic = await findMusic.music.find(
            (m) => m._id.toString() === musicId
        )

        res.status(200).json({
            message: "successful find it",
            singleMusic
        })
    }
    catch (err) {
        res.status(500).json({
            message: "problem to your request ",
            error: err.message
        })
    }
}

async function particularFav(req, res) {
    try {
        const {album, music, playlist} = req.body  || {}

        let newEntry = {}

        if(music){
             newEntry = {
                type:'music',
                item:music,
                typeModel:'music'
            }
        }

        if(playlist){
             newEntry = {
                type:'playlist',
                item:playlist,
                typeModel:'playlist'
            }
        }

        if(album){
             newEntry = {
                type:'album',
                item:album,
                typeModel:'album'
            }
        }

        const createFav = await favSchema.findOneAndUpdate(
            {user:req.user.id},
            {
                $addToSet:{
                    favorite:newEntry
                }
            },
            {
                upsert:true,
                new:true
            }
        )
        
        res.status(201).json({
            message:"Successful add to fav",
            createFav
        })
       
    }
    catch (e) {
        res.status(500).json({
            message: "the server encouter an unexpected condition",
            error: e.message
        })
    }
}

async function getUserFav(req, res) {
    try {

        const fav = await favSchema.findOne({ user: req.user.id })
        .populate('user', 'username pfp _id')
            .populate({
                path: 'favorite.item',
                strictPopulate: false,
                populate: {
                    path: 'artist',
                    model: 'user',
                    select: 'username _id',
                    strictPopulate: false
                }
            })
            .populate({
                path: 'favorite.item',
                strictPopulate: false,
                populate: {
                    path: 'user',
                    model: 'user',
                    select: 'username pfp _id',
                    strictPopulate: false
                }
            })

        res.status(200).json({
            success: true,
            message: "successful get particular data",
            fav
        })
    }
    catch (e) {
        res.status(500).json({
            message: "Error in you",
            error: e.message
        })
    }
}

async function favoriteMusic(req, res) {
    try {
        const { favoriteId, type } = req.params;

        const allowedType= {
            music:'music',
            album:'album',
            playlist:'playlist'
        }

        if(!allowedType){
            return res.status(400).json({
                messge:"Invalid type"
            })
        }

        await favSchema.findOneAndUpdate(
            {
                user:req.user.id
            },

            {
                $pull:{
                    favorite:{item:favoriteId}
                }
            }
        )

        const addToFav = await favSchema.findOneAndUpdate(
            { user: req.user.id },
            {
                $push: {
                    favorite: {
                        $each:[
                            {
                                type,
                                typeModel:allowedType[type],
                                item:favoriteId,
                                createdAt:new Date()
                            }

                        ],
                        $position:0
                    }
                }
            },
            {
                upsert: true,
                new: true
            }
        )
        res.status(200).json({
            message: "successful push into favorite",
            addToFav
        })
    }
    catch (e) {
        res.status(500).json({
            message: "the server encouter an unexpected condition",
            error: e.message
        })
    }
}

async function deleteFavMusic(req, res) {
    try {

        const { favoriteId } = req.params
        const deleteFavMus = await favSchema.findOneAndUpdate(
            { user: req.user.id },
            {
                $pull: {
                    favorite:{
                        _id:favoriteId
                    }
                }
            },
            { returnDocument: 'after' }

        )
        res.status(200).json({
            message: "Successful Delete fav Music",
            deleteFavMus
        })
    }
    catch (e) {
        res.status(500).json({
            message: 'the server encouter an unexpected condition',
            error: e.message
        })
    }
}

async function singleFav(req, res) {

    try {
        let { favId, favoriteId } = req.params

        const singleFav = await favSchema.findOne({
            _id: favId,
            user: req.user.id
        }).populate('favorite')

        const getBySingle = await singleFav.favorite.find(
            (m) => m._id.toString() === favoriteId
        )

        res.status(200).json({
            message: "successful get by single",
            getBySingle
        })
    }
    catch (e) {
        res.status(500).json({
            message: "the server encouter an unexpected condition",
            error: e.message
        })
    }
}



module.exports = { playlist, particularUserPlaylist, deleteMusic, pushMusic, getSingleMusic, favoriteMusic, particularFav, getUserFav, deleteFavMusic, singleFav, separate, deletePlaylistComplete, visibilityPlaylist,getParticulatVisible, updateName }