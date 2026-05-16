const userSchema=require('../models/playlist.model')
const mongoose=require('mongoose')
const favSchema=require('../models/fav.models')
const musicSchema=require('../models/music.model')

async function playlist(req,res) {

    try{
        let {name,music,user}=req.body
        // if(!name || !music){
        //   return  res.status(400).json({
        //         message:"Name and Music is required"
        //     })
        // }
        const createPlaylist=await userSchema.create({
        name,
        music:[],
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
        const particular=await userSchema.find({user:req.user.id}).populate('music', 'title uri').populate('user')
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

async function separate(req,res){
    try{
        let {id}=req.params
        
        const getSinglePlaylist=await userSchema.findOne({ _id: id, user:req.user.id }).populate('user')

        res.status(200).json({
            message:'Successful get Music',
            getSinglePlaylist
        })
    }
    catch(err){
        res.status(500).json({
            message:"Error in your response"
        })
    }
}

async function deletePlaylistComplete(req,res){
    try{
        let {id}=req.params
        const deletePlatlist=await userSchema.deleteOne({_id:id, user:req.user.id})
        res.status(200).json({
            message:"Successful delete",
            deletePlatlist
        })

    }
    catch(err){
        res.status(500).json({
            message:"Error in your response",
            error:e.message
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

    const update= await userSchema.findByIdAndUpdate(
        {_id:particularId, user:new mongoose.Types.ObjectId(req.user.id)}
         ,
         {
        $addToSet:{
            music:musicId
        }
    },
    {new :true}
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

async function particularFav(req,res){
    try{

        let {favorite}=req.body

         if(!favorite){
            return res.status(400).json({
                message:"Favorite is required"
            })
        }

        const exist= await musicSchema.findById(favorite)

          if(!exist){
            return res.status(404).json({
                message:"Item not found"
            })
        }


        const createFav=await favSchema.create({
            favorite,
            user:req.user.id
        })
        res.status(201).json({
            message:"Successfull Create music",
            createFav
        })
    }
    catch(e){
        res.status(500).json({
            message:"the server encouter an unexpected condition",
            error:e.message
        })
    }
}

async function getUserFav(req,res){
    try{

        const getUserFavoritesMusic=await favSchema.find({user:req.user.id}).populate('favorite', 'uri title artist').populate('user').populate({path:'favorite',populate:{path:"artist"}})
        
        res.status(200).json({
            success:true,
            message:"successful get particular data",
            getUserFavoritesMusic
        })

        
        
    }
    catch(e){
        res.status(500).json({
            message:"Error in you",
            error:e.message
        })
    }
}

async function favoriteMusic(req,res){
    try{

        const { favoriteId}=req.params;
        const addToFav=await favSchema.findOneAndUpdate(
            {  user: req.user.id },
            {
                $addToSet:{
                    favorite:favoriteId
                }
            },
            {returnDocument:'after'}
        ).populate('favorite', 'uri title artist').populate('user').populate({path:'favorite', populate:{path:'artist'}})
        res.status(200).json({
            message:"successful push into favorite",
            addToFav
        })
    }
    catch(e){
        res.status(500).json({
            message:"the server encouter an unexpected condition",
            error:e.message
        })
    }
}

async function deleteFavMusic(req,res){
    try{

        const {favoriteId}=req.params
        const deleteFavMus= await favSchema.findOneAndUpdate(
            {user:req.user.id},
            {
            $pull:{
                favorite: favoriteId
            }
        },
        {returnDocument:'after'}
        
    )
    res.status(200).json({
        message:"Successful Delete fav Music",
        deleteFavMus
    })
}
catch(e){
    res.status(500).json({
        message:'the server encouter an unexpected condition',
        error:e.message
    })
}
}

async function singleFav(req,res){

    try{
        let {favId, favoriteId}=req.params
        
        const singleFav= await favSchema.findOne({
            _id:favId,
    user:req.user.id
}).populate('favorite')

const getBySingle=await singleFav.favorite.find(
    (m) => m._id.toString()=== favoriteId
)

res.status(200).json({
    message:"successful get by single",
    getBySingle
})
}
catch(e){
    res.status(500).json({
        message:"the server encouter an unexpected condition",
        error:e.message
    })
}
}

module.exports={playlist,particularUserPlaylist,deleteMusic,pushMusic,getSingleMusic,favoriteMusic,particularFav,getUserFav,deleteFavMusic,singleFav,separate,deletePlaylistComplete}