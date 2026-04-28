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


async function getMusic(req,res){
  const page= parseInt(req.query.page) || 1
      const limit= 5;
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

module.exports={music, album, getMusic,single}