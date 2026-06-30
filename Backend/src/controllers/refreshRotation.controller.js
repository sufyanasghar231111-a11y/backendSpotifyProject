const jwt= require('jsonwebtoken')
const postSchema=require('../models/post.model')

function generatedAccessToken(user){
    return jwt.sign(
        {
            id:user._id,
            role:user.role
        },
        process.env.ACCESS_TOKEN,
        {
            expiresIn:'10m'
        }
    )
}

function generatedRefreshToken(user){
    return jwt.sign(
        {
            id:user._id,
            role:user.role
        },
        process.env.SECRET_JWT,
        {
            expiresIn:'7d'
        }
    )
}

const refreshTokenRotation=async (req,res) =>{
    try{
        const refreshToken=req.cookies.refreshToken
        if(!refreshToken){
          return  res.status(401).json({
                message:"Token is missing"
            })
        }

        const decoded = jwt.verify(refreshToken, process.env.SECRET_JWT)
        
        const user=await postSchema.findById(decoded.id)        

        if(!user){
            return res.status(404).json({
                message:"user is not found"
            })
        }

        const accessToken=generatedAccessToken(user)
        const RefreshToken=generatedRefreshToken(user)

        res.cookie('refreshToken',RefreshToken ,{
            httpOnly:true,
            sameSite:"strict",
            secure:true,
            maxAge: 7 * 24 * 60 * 60 * 1000
        } )

        res.status(200).json({
            message:"successful",
            accessToken,
            user:{
                _id:user._id,
                username:user.username,
                pfp:user.pfp,
                role:user.role
            }
        })
    }
    catch(err){
        res.status(500).json({
            message:"Internal Error",
            error:err.message
        })
    }
}

module.exports={refreshTokenRotation}