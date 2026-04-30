const userSchema=require('../models/playlist.model')
const mongoose=require('mongoose')

async function playlist(req,res) {

    try{
        let {name,music,user}=req.body
        if(!name || !music){
          return  res.status(400).json({
                message:"Name and Music is required"
            })
        }
        const createPlaylist=await userSchema.create({
        name,
        music,
       user:req.user.id
    })
    
    res.status(201).json({
        message:"Successful create playlist",
        createPlaylist,
        user:req.user.id
    })
}
catch(e){
    res.status(500).json({
        
        message:"Error in playist",
        error:e.message
    })
}
}

async function particularUserPlaylist(req,res){
    
    try{
        const particular=await userSchema.find({user:req.user.id}).populate('music', 'title uri')
        res.status(200).json({
            message:"successful get playlist",
            particular
        })
    }
    catch(err){
        res.status(500).json({
            message:"Error in particularUser"
        })
    }
}

async function deleteMusic(req,res){
    try{
        const {particularId,musicId}=req.params   
        const deleteParticularMusic=await userSchema.findByIdAndUpdate(particularId,{
            $pull:{
               music: new mongoose.Types.ObjectId(musicId)
            
            }
        },

        {new:true}
    )

    res.status(200).json({
        message:"Successful delete Music",
        deleteParticularMusic
    })
    }
    catch(err){
        res.status(500).json({
            message:"the server encouter an unexpected condition",
            error:err.message
        })
    }
}

module.exports={playlist,particularUserPlaylist,deleteMusic}