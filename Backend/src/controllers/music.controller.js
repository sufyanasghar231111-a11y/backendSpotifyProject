const musicSchema=require('../models/music.model')
const albumExport=require('../models/album.model')
const jwt=require('jsonwebtoken')
const uploadFile=require('../services/storage.service')
const mongoose=require('mongoose')


async function music(req,res) {
  
    let {title}=req.body
    let file=req.file
    
    const result= await uploadFile(file.buffer.toString('base64'))
    const user= await musicSchema.create({
      artist:req.user.id,
      uri:result.url,
      title,
    })
    
    res.status(201).json({
      success:true,
      message:"Successful create music",
      user:{
        id:user._id,
        title:user.title,
        uri:user.uri,
        artist:req.user.id
      }
    })
}

async function Album(req,res){
      let {title, album,artistName} =req.body

      const user= await albumExport.create({
        title,
        artistName,
        album,
        artist:req.user.id
      })

      res.status(201).json({
        success:true,
        message:"Successful Created",
        title:user.title,
        name:user.artistName,
        album:album,
        artist:req.user.id
      })
}

async function getMusic(req,res){
  const page= parseInt(req.query.page) || 1
      const limit= 8;
      const skip=(page-1)*limit
  
      const music=await musicSchema
      .find().populate('artist', 'username email')
      .skip(skip)
      .limit(limit)
  
  
      res.status(200).json({
        message:"Music fetched successfully",
        music
      })
}

async function single(req,res) {
    try{
        let {id}=req.params
        const detail= await musicSchema.findById({_id:id}).populate('artist', 'username')
        res.status(200).json({
            message:"Successfull get by single",
            detail
        })
    }

    catch(err){
        res.status(500).json({
            message:"Not exist"
        })
    }
}

async function allAlbum(req,res){

  try{

    const  page= parseInt(req.query.page) || 1
    const limit=5
    const skip=(page-1)*limit

    const album=await albumExport.find().populate('album', 'uri title').populate('artist', 'username')
    .skip(skip)
    .limit(limit)

    res.status(200).json({
      message:"Successful get album",
      album
    })
  }

  catch(err){
    res.status(500).json({
      message:"No Album is here"
    })
  }
}

async function detail(req,res){
 try{
  let {id} =req.params
  const detailFetch=await albumExport.findById({_id:id}).populate('album', 'uri title ').populate('artist', 'username')
  res.status(200).json({
    message:'Successfull fetch detail',
    detailFetch
  })
 } 
 catch(e){
  res.status(500).json({
    message:"NO Album is required",
    Error:e.message
  })
 }
}

async function particularArtist(req,res){
  
    const myalbum=await albumExport.find({artist:req.user.id}).populate('artist', 'username')
    
    res.status(200).json({
      message:"successful get your album",
      myalbum
    })

}

async function deleteMusic(req,res){
  try{

    let {albumId, musicId}=req.params
    
    const deleteMusicByAlbum=await albumExport.findByIdAndUpdate(albumId,{
      $pull:{
        album:new mongoose.Types.ObjectId(musicId)
      }
    },
    {new:true}
  ).populate('album', 'title uri')
  
  
  res.status(200).json({
    message:"Successful delete music",
    deleteMusicByAlbum
  })
}

catch(e){
  res.status(500).json({
message:"NO music is found",
  })
}
}

async function updateMusic(req,res){

  try{

    const {albumId}=req.params
    
    const {title, artistName}=req.body
    const updateContent= await albumExport.findByIdAndUpdate(albumId,{
      $set:{
        title,
        artistName
      }
    },
    {new:true}
  )

  if(!albumId){
    res.status(404).json({
      message:"Album not found"
    })
  }

  res.status(200).json({
    message:"successful update MyAlbum",
    updateContent
  })
}

catch(err){
  res.status(500).json({
    message:"Failed to update Album",
    Error:err.message
  })
}
}

module.exports={music, Album, getMusic,single,allAlbum,detail,particularArtist,deleteMusic,updateMusic}
