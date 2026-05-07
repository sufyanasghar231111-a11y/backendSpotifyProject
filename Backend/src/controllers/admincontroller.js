
const postSchema=require('../models/post.model')
const albumSchema=require('../models/album.model')

async function adminCheckArtist(req,res){

    const user=await postSchema.findById(req.user.id)
    
    const getArtist= await postSchema.find({role:"artist", _id:{ $nin: user.blockedArtists}})

    res.status(200).json({
        message:"get all artist",
        data:getArtist.map((elem)=>{
            return {
                id: elem._id,
            username: elem.username,
            email: elem.email,
            role: elem.role
        }
        })
    })
}

async function adminCheckUser(req,res){
    
    const getArtist= await postSchema.find({role:"user"})

    res.status(200).json({
        message:"get all user",
        data:getArtist.map((elem)=>{
            return {
            username: elem.username,
            email: elem.email,
            role: elem.role
        }
        })
    })
}

async function allAlbum(req,res){
    try{
        const getalbum=await albumSchema.find().populate('artist','username email').populate('album')

        res.status(200).json({
            message:"successful get all album",
           allAlbum: getalbum
        })
    }
    catch(e){
        res.status(500).json({
            message:"The error in your request",
            error:e.message
        })
    }
}

async function particularAlbum(req,res) {

    try{

        let {id}=req.params
        const getParticularAlbum=await albumSchema.find({artist:id}).populate('album', 'uri title').populate('artist', 'username email')
        
        res.status(200).json({
            message:"Successful get particular album",
            data:getParticularAlbum
        })
    }
    catch(err){
        res.status(500).json({
            message:"Error in your request"
        })
    }
}

async function deleteArtistAlbum(req,res){
    try{
        let {dataId, albumId}=req.params
        const deleteMusic=await albumSchema.findByIdAndUpdate(dataId, {
            $pull:{
                album: albumId
            }
        },
    {returnDocument:'after'}
    )

        res.status(200).json({
            message:"Successful delete music",
            deleteMusic
        })
    }
    catch(e){
        res.status(500).json({
            message:"Error in your request or server"
        })
    }
}

async function blockArtist(req,res) {
    try{
        let userId=req.user.id
        let {id}=req.params
        const block=await postSchema.findByIdAndUpdate(userId,
           { $addToSet:{
            blockedArtists:id
            }
        },
        {new:true}
        )

        res.status(200).json({
            message:"successfull block",
            block
        })
    }
    catch(err){
        res.status(500).json({
            message:"Error in your server or request",
            error:err.message
        })
    }
}

async function unblockArtist(req,res){
    
}

module.exports={adminCheckUser,adminCheckArtist,allAlbum,particularAlbum,deleteArtistAlbum ,blockArtist,unblockArtist}