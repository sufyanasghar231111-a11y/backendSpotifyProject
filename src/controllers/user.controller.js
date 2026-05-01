const userSchema=require('../models/playlist.model')
const mongoose=require('mongoose')
const favSchema=require('../models/fav.models')

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

        {returnDocument:'after'}
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

async function pushMusic(req,res){
try{
    const {particularId,musicId}=req.params

    if(!particularId || !musicId){
        res.status(400).json({
            message:"Field required or missing "
        })
    }

    const update= await userSchema.findByIdAndUpdate(particularId,{
        $push:{
            music:new mongoose.Types.ObjectId(musicId)
        }
    },

    {returnDocument:"after"}
)
    res.status(200).json({
        message:"Successfull update Music",
        update
    })
}
catch(err){
    res.status(500).json({
        message:"the server encouter an unexpected condition",
        error:err.message
    })
}
}

async function getSingleMusic(req,res){
    try{

        const {particularId,musicId}=req.params
        const findMusic=await userSchema.findOne(
           {_id: particularId,
           user: req.user.id}
        ).populate('music')

        const singleMusic=await findMusic.music.find(
            (m)=> m._id.toString()=== musicId
        )
        
        res.status(200).json({
            message:"successful find it",
            singleMusic
        })
    }
    catch(err){
        res.status(500).json({
            message:"problem to your request ",
            error:err.message
        })
    }
}



async function favoriteMusic(req,res){
    const {favId, favoriteId}=req.params;
    const addToFav=await favSchema.findByIdAndUpdate(favId, {
        $addToSet:{
            user:req.user.id,
            favorite:new mongoose.Types.ObjectId
        }
    })
    res.status(200).json({
        message:"successful push into favorite",
        addToFav
    })
}

module.exports={playlist,particularUserPlaylist,deleteMusic,pushMusic,getSingleMusic,favoriteMusic}