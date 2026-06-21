const musicSchema = require('../models/music.model')
const albumExport = require('../models/album.model')
const jwt = require('jsonwebtoken')
const { uploadFile, uploadThumbnail } = require('../services/storage.service')
const mongoose = require('mongoose')
const uploadalbumPic = require('../services/album.service')
const userSchema=require('../models/playlist.model')

async function music(req, res) {

  let { title } = req.body
  let file = req.files.file[0]
  let image = req.files.image[0]

  const result = await uploadFile(file.buffer.toString('base64'))
  const result1 = await uploadThumbnail(image.buffer.toString('base64'))

  const user = await musicSchema.create({
    artist: req.user.id,
    uri: result.url,
    title,
    image: result1.url
  })

  res.status(201).json({
    success: true,
    message: "Successful create music",
    user: {
      id: user._id,
      title: user.title,
      uri: user.uri,
      artist: req.user.id,
      image: user.image
    }
  })
}

async function Album(req, res) {
  let { title, album, artistName } = req.body
  let image = ''
  if (req.file) {
    const result = await uploadalbumPic(req.file.buffer)
    image = result.url
  }
  const user = await albumExport.create({
    title,
    artistName,
    album,
    artist: req.user.id,
    image
  })

  res.status(201).json({
    success: true,
    message: "Successful Created",
    title: user.title,
    name: user.artistName,
    album: album,
    artist: req.user.id,
    image
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
        .select('_id uri title artist image')
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
        userSchema
        .find({visibility:'public' ,name:{$regex:search, $options:'i'}}).sort({createdAt:-1}).populate({path:"music", populate:{path:'artist', select:'_id username'}}).populate({path:'user', select:"_id username"})
        .skip(skip)
        .limit(limit)
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

async function getSingleVisible(req,res){
  try{
    const {id} =req.params
    const singleVisible=await userSchema.findOne({visibility:'public',_id:id}).populate({path:"music", populate:{path:'artist', select:'_id username'}}).populate({path:'user', select:"_id username"})
    res.status(200).json({
      message:"successful GetSingle",
      singleVisible
    })
  }
  catch(err){
    res.status(500).json({
      message:"Error in Request",
      error:err.message
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

  const myalbum = await albumExport.find({ artist: req.user.id }).populate('artist', 'username')

  res.status(200).json({
    message: "successful get your album",
    myalbum
  })

}

async function deleteMusic(req, res) {
  try {

    let { albumId, musicId } = req.params

    const deleteMusicByAlbum = await albumExport.findByIdAndUpdate(albumId, {
      $pull: {
        album: new mongoose.Types.ObjectId(musicId)
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

async function updateMusic(req, res) {

  try {

    const { albumId } = req.params

    const { title, artistName } = req.body
    const updateContent = await albumExport.findByIdAndUpdate(albumId, {
      $set: {
        title,
        artistName
      }
    },
      { new: true }
    )

    if (!albumId) {
      res.status(404).json({
        message: "Album not found"
      })
    }

    res.status(200).json({
      message: "successful update MyAlbum",
      updateContent
    })
  }

  catch (err) {
    res.status(500).json({
      message: "Failed to update Album",
      Error: err.message
    })
  }
}

module.exports = { music, Album, getBothSongalbum, single, detail, particularArtist, deleteMusic, updateMusic ,getSingleVisible}
