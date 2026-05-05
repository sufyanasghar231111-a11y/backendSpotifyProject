
const postSchema=require('../models/post.model')
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

module.exports={adminCheckUser,adminCheckArtist}