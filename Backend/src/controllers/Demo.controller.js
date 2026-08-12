const musicSchema = require('../models/music.model')
const albumSchema = require("../models/album.model")
const playlistSchema = require('../models/playlist.model')

async function demoApi (req, res) {
    try{
        const [music, album, playlist] = await Promise.all([
            musicSchema.find().populate('artist', 'username').limit(8)
            ,
            albumSchema.find().populate('artist', 'username').limit(5),
            playlistSchema.find({visibility:'public'}).populate('user', 'username').limit(5)
        ])

        res.status(200).json({
            message:"Successful get",
            music, album, playlist
        })
    }
    catch(err){
        res.status(500).json({
            message:"internal error"
        })
    }
}

module.exports = { demoApi }