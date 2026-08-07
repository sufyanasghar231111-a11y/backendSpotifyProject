const musicSchema = require('../models/music.model')
const albumExport = require('../models/album.model')
const jwt = require('jsonwebtoken')
const { uploadFile, uploadThumbnail } = require('../services/storage.service')
const mongoose = require('mongoose')
const uploadalbumPic = require('../services/album.service')
const userSchema = require('../models/playlist.model')
const postSchema = require('../models/post.model')

async function music(req, res) {
  try {
    let { title, image } = req.body
    let file = req.file
    
    if (!title || !file) {
      return res.status(400).json({
        message: "Missing Title or Song"
      })
    }

    const result = await uploadFile(file.buffer)

    const music = await musicSchema.create({
      artist: req.user.id,
      uri: result.url,
      title,
      image
    })

    const createTime = await musicSchema.findByIdAndUpdate(music._id,
      {
        lastCreate:new Date()
      }
    )

    res.status(201).json({
      success: true,
      message: "Successful create music",
      music,
      
    })

  }
  catch (err) {
    res.status(500).json({
      message: "Internal error"
    })
  }

}

async function deleteSong(req, res){
  try{
    const {id} = req.params
    const deletesong = await musicSchema.findOneAndDelete(
      {artist:req.user.id,
        _id:id
      }
    )

    if(!deletesong){
      return res.status(404).json({
        message:"Not found"
      })
    }

    res.status(201).json({
      message:"Successful delete",
      deletesong
    })
  }
  catch(err){
    res.status(500).json({
      message:"Internal error",
      error:err.message
    })
  }
}

async function Album(req, res) {
  let { title, album, artistName } = req.body
  let image = ''
  if (req.file) {
    const result = await uploadalbumPic(req.file.buffer)
    image = result.url
  }
  const albums = await albumExport.create({
    title,
    artistName,
    album: [],
    artist: req.user.id,
    image
  })

  const createTime = await albumExport.findByIdAndUpdate(albums._id,{
    lastCreate:new Date()
  })

  res.status(201).json({
    success: true,
    message: "Successful Created",
    albums
  })
}

async function getBothSongalbum(req, res) {
  try {
    
    const page = parseInt(req.query.page) || 1
    const limit = 8;
    const skip = (page - 1) * limit
    let filter = {}
    const search = req.query.search || ''
    const genre = req.query.genre

    const user = await postSchema.findById(req.user.id)
    if(!user){
      return res.status(400).json({
        message:"User not found"
      })
    }

    if (search) {
      filter.title = { $regex: search, $options: 'i' }
    }


    if (genre) {
      filter.genre = genre
    }

    //for ranking search 

    const [music, album, visible] = await Promise.all([
      musicSchema
        .find(filter).sort({ createdAt: -1 })
        .select('_id uri title artist image createdAt')
        .populate('artist', 'username email')
        .skip(skip)
        .limit(limit),


      // album get
      albumExport
        .find(filter).sort({ createdAt: -1 })
        .populate('album', 'uri title').populate('artist', 'username')
        .skip(skip)
        .limit(limit),


      // visible get
      user.role === 'admin' ? (
        userSchema
          .find({  name: { $regex: search, $options: 'i' } }).sort({ createdAt: -1 }).populate({ path: "music", populate: { path: 'artist', select: '_id username' } }).populate({ path: 'user', select: "_id username pfp" })
          .skip(skip)
          .limit(limit)
      ):(
        userSchema
          .find({visibility: 'public',  name: { $regex: search, $options: 'i' } }).sort({ createdAt: -1 }).populate({ path: "music", populate: { path: 'artist', select: '_id username' } }).populate({ path: 'user', select: "_id username pfp" })
          .skip(skip)
          .limit(limit)
      )
    ])

    res.status(200).json({
      message: "Music fetched successfully",
      music, album, visible
    })
  }
  catch (err) {
    res.status(500).json({
      message: "Error in your request",
      error: err.message
    })
  }
}

async function getSingleVisible(req, res) {
  try {
    const { id } = req.params
    const singleVisible = await userSchema.findOne({ visibility: 'public', _id: id }).populate({ path: "music", populate: { path: 'artist', select: '_id username' } }).populate({ path: 'user', select: "_id username" })
    res.status(200).json({
      message: "successful GetSingle",
      singleVisible
    })
  }
  catch (err) {
    res.status(500).json({
      message: "Error in Request",
      error: err.message
    })
  }
}

async function single(req, res) {
  try {
    let { id } = req.params
    const detail = await musicSchema.findById({ _id: id }).populate('artist', 'username')
    res.status(200).json({
      message: "Successfull get by single",
      detail
    })
  }

  catch (err) {
    res.status(500).json({
      message: "Not exist"
    })
  }
}

async function detail(req, res) {
  try {
    let { id } = req.params
    const detailFetch = await albumExport.findById({ _id: id }).populate('artist', 'username').populate('album')


    res.status(200).json({
      message: 'Successfull fetch detail',
      detailFetch
    })
  }
  catch (e) {
    res.status(500).json({
      message: "NO Album is required",
      Error: e.message
    })
  }
}

async function particularArtist(req, res) {
  try
  {
    
    const myalbum = await albumExport.find({ artist: req.user.id }).sort({ createdAt: -1 }).populate('artist', 'username').populate('album')
    res.status(200).json({
      message: "successful get your album",
      myalbum
    })
  }
  catch(err){
    res.status(500).json({
      message:"Internal error"
    })
  }

}

async function particularArtistByUser(req, res) {
  try
  {
   const {id} =req.params
    const findUser = await postSchema.findById(id) 
    if(!findUser){
      return res.status(404).json({
        message:"User is not found "
      })
    }
    const myalbum = await albumExport.find({artist:id}).sort({ createdAt: -1 }).populate('artist', 'username').populate('album')
    res.status(200).json({
      message: "successful get your album",
      myalbum
    })
  }
  catch(err){
    res.status(500).json({
      message:"Internal error",
      error:err.message
    })
  }

}

async function addSong (req, res){
  try{
    const {albumId, musicId} = req.params
    const adding = await albumExport.findByIdAndUpdate(
      {artist:req.user.id, _id:albumId},{
        $addToSet:{
          album:musicId
        }
      },
      {
        new:true
      }
    )
    res.status(201).json({
      message:"Successful add",
      adding
    })
  }
  catch(err){
    res.status(500).json({
      message:"Internal error",
      error:err.message
    })
  }
}

async function deleteMusic(req, res) {
  try {

    let { albumId, musicId } = req.params

    const deleteMusicByAlbum = await albumExport.findByIdAndUpdate(
      {_id:albumId, artist:req.user.id}, {
      $pull: {
        album: musicId
      }
    },
      { new: true }
    ).populate('album', 'title uri')


    res.status(200).json({
      message: "Successful delete music",
      deleteMusicByAlbum
    })
  }

  catch (e) {
    res.status(500).json({
      message: "NO music is found",
    })
  }
}


async function updateSong(req, res) {
  try {
    const { id } = req.params
    const { title } = req.body;
    let result = await uploadThumbnail(req.file.buffer)

    const updatemusic = await musicSchema.findByIdAndUpdate(
      { user: req.user.id, _id: id },
      {
        image: result.url,
        title
      },
      {
        new: true
      }
    )

    res.status(200).json({
      message: "successful update",
      updatemusic
    })

  }
  catch (err) {
    res.status(500).json({
      message: "Internal error"
    })
  }
}

async function deleteSongDetail(req, res) {
  try {
    const { id } = req.params
    const deleteThumbnail = await musicSchema.findByIdAndUpdate(
      { user: req.user.id, _id: id },
      {
        image: ''
      },
      {
        new: true
      }
    )

    res.status(201).json({
      message: "Successful delete",
      deleteThumbnail
    })
  }
  catch (err) {
    res.status(500).json({
      message: "Internal error"
    })
  }
}

async function updateAlbum(req, res) {
  try {
    const { id } = req.params
    const { title } = req.body;
    let result = await uploadalbumPic(req.file.buffer)

    const updatealbum = await albumExport.findByIdAndUpdate(
      { user: req.user.id, _id: id },
      {
        image: result.url,
        title
      },
      {
        new: true
      }
    )

    res.status(200).json({
      message: "successful update",
      updatealbum
    })

  }
  catch (err) {
    res.status(500).json({
      message: "Internal error"
    })
  }
}

async function deleteAlbumPic(req, res) {
  try {
    const { id } = req.params
    const deleteThumbnail = await albumExport.findByIdAndUpdate(
      { user: req.user.id, _id: id },
      {
        image: ''
      },
      {
        new: true
      }
    )

    res.status(201).json({
      message: "Successful delete",
      deleteThumbnail
    })
  }
  catch (err) {
    res.status(500).json({
      message: "Internal error"
    })
  }
}

module.exports = { music, Album, getBothSongalbum, single, detail, particularArtist, deleteMusic, getSingleVisible, updateSong, deleteSongDetail, deleteAlbumPic, updateAlbum, deleteSong, addSong, particularArtistByUser }
