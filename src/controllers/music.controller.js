const musicSchema=require('../models/music.model')
const albumExport=require('../models/album.model')
const jwt=require('jsonwebtoken')
const uploadFile=require('../services/storage.service')

async function music(req,res) {
  
    let {title}=req.body
    let file=req.file
    
    const result= await uploadFile(file.buffer)
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

async function album(req,res){
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

module.exports={music, album}