const music = require("../models/music.model")
const album = require("../models/album.model")
const recentSearch = require("../models/recentsearch.model")

async function createRecentSearch(req, res) {
    try {
        const { song, album, text, playlist } = req.body || {}

        let newEntry = {}

        if (song) {
            newEntry = {
                type: 'song',
                typeModel: 'music',
                item: song
            }
        }

        if (album) {
            newEntry = {
                type: 'album',
                typeModel: 'album',
                item: album
            }
        }

        if (text) {
            newEntry = {
                type: 'text',
                text: text
            }
        }

        if (playlist) {
            newEntry = {
                type: 'playlist',
                typeModel: 'playlist',
                item: playlist
            }
        }

        const recentSearchItem = await recentSearch.findOneAndUpdate(
            {
                user: req.user.id
            }
            ,
            {
                $push: {
                    search: newEntry
                }
            },
            {
                new: true,
                upsert: true
            }
        )
        res.status(201).json({
            message: "successfull create recent search",
            recentSearchItem
        })
    }
    catch (err) {
        res.status(500).json({
            message: "Internal Server Error",
            error: err.message
        })
    }
}

async function getRecentSearch(req, res) {
    try {
        const getSearchItem = await recentSearch.find({ user: req.user.id })
            .populate('user', 'username pfp _id')
            .populate({
                path: 'search.item',
                strictPopulate: false,
                populate: {
                    path: 'artist',
                    model: 'user',
                    select: 'username _id',
                    strictPopulate: false
                }
            })
            .populate({
                path: 'search.item',
                strictPopulate: false,
                populate: {
                    path: 'user',
                    model: 'user',
                    select: 'username pfp _id',
                    strictPopulate: false
                }
            })

        res.status(200).json({
            message: "successful get recent search",
            getSearchItem
        })
    }
    catch (err) {
        res.status(500).json({
            message: "Internal Server Error",
            error: err.message
        })
    }
}

async function patchRecentSearch(req, res) {
    let { id } = req.params
    try {

        await recentSearch.findOneAndUpdate(
            { user: req.user.id },
            {
                $pull: {
                    search: { item: id }
                }
            }
        )

        const pushRecentSearch = await recentSearch.findOneAndUpdate(
            { user: req.user.id },
            {
                $push: {
                    search: {
                        $each: [{
                            type: 'song',
                            typeModel: 'music',
                            item: id,
                            createdAt: new Date
                        }],
                        $position: 0,
                        $slice: 10
                    }
                }
            }
            , {
                new: true,
                upsert: true
            }
        )

        res.status(200).json({
            message: "successful update get Music",
            pushRecentSearch
        })
    }
    catch (err) {
        res.status(500).json({
            message: 'Internal Server Error',
            error: err.message
        })
    }
}

async function patchRecentAlbum(req, res) {
    let { id } = req.params
    try {
        await recentSearch.findOneAndUpdate(
            { user: req.user.id },
            {
                $pull: {
                    search: { item: id }
                }
            }
        )

        const pushRecentSearch = await recentSearch.findOneAndUpdate(
            { user: req.user.id },
            {
                $push: {
                    search: {
                        $each: [{
                            item: id,
                            type: 'album',
                            typeModel: 'album',
                            createdAt: new Date
                        }],
                        $position: 0,
                        $slice: 10
                    }
                }
            }
            , {
                returnDocument: 'after'
            }
        )

        res.status(200).json({
            message: "successful update get Music",
            pushRecentSearch
        })
    }
    catch (err) {
        res.status(500).json({
            message: 'Internal Server Error',
            error: err.message
        })
    }
}

async function patchRecentPlaylist(req, res){
    try{
        const {id}=req.params

        await recentSearch.findOneAndUpdate(
            {user:req.user.id},
            {
                $pull :{
                    search: {item:id}
                }
            }
            
        )

        const visible=await recentSearch.findOneAndUpdate(
            {user:req.user.id},
            {
                $push:{
                    search:{
                        $each:[
                            {
                                item:id,
                                
                                type:'playlist',
                                typeModel:'playlist',
                                createdAt:new Date
                            }
                        ],
                        $position:0,
                        $slice:10
                    }
                }
            },
            {returnDocument: 'after'}
        )

        res.status(200).json({
            message:"Successful get",
            visible
        })
    }
    catch(err){
        res.status(500).json({
            message:"Invalid Response",
            error:err.message
        })
    }
}

async function deleteRecentSearch(req, res) {
    try {
        let { id } = req.params
        const deleteSearch = await recentSearch.findOneAndUpdate(
            { user: req.user.id },
            {
                $pull: {
                    search:
                    {
                      $or:[
                          { item: id },
                    { type: 'text', _id: id }
                      ] 
                    } 
                },
            }
            ,
            {
                returnDocument: 'after'
            }
        )
        res.status(200).json({
            message: "successful delete recent search",
            deleteSearch
        })
    }
    catch (err) {
        res.status(500).json({
            message: "Internal Server Error",
            error: err.message
        })
    }
}

async function patchText(req, res) {
    try {
        const { text } = req.body || {}

        await recentSearch(
            { user: req.user.id },
            {
                $pull: { text: text }
            }
        )
        const patchRecentText = await recentSearch.findOneAndUpdate(
            {
                user: req.user.id,
            },
            {
                $push: {
                    search: {
                        $each: [{ type: 'text', text: text, createdAt: new Date }],
                        $position: 0,
                        slice: 10
                    }
                }
            },
            {
                new: true,
                upsert: true
            }

        )

        res.status(200).json({
            message: "successfull patch",
            patchRecentText
        })
    }
    catch (err) {
        res.status(500).json({
            message: "Error in your request",
            error: err.message
        })
    }
}

module.exports = { createRecentSearch, getRecentSearch, patchRecentSearch, patchRecentAlbum, deleteRecentSearch, patchText,patchRecentPlaylist }