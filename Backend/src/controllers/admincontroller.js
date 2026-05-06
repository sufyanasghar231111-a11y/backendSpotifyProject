
const postSchema=require('../models/post.model')
const albumSchema=require('../models/album.model')

async function adminCheckArtist(req,res){
    
    const getArtist= await postSchema.find({role:"artist"})

    res.status(200).json({
        message:"get all artist",
        data:getArtist.map((elem)=>{
            return {
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
            getalbum
        })
    }
    catch(e){
        res.status(500).json({
            message:"The error in your request",
            error:e.message
        })
    }
}



module.exports={adminCheckUser,adminCheckArtist,allAlbum}