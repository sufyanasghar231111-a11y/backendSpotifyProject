const jwt=require('jsonwebtoken')
const musicSchema=require('../models/music.model')

async function authartist(req,res,next) {
    const token=req.cookies.token
      if(!token){
          return   res.status(401).json({
            message:"Unauthorized: Token is not provide"
          })
        }
    
        try{
          const decoded=jwt.verify(token, process.env.SECRET_JWT)
    
          if(decoded.role !== 'artist' ){
            res.status(401).json({
              message:"Unauthorized user"
            })
          }
          req.user=decoded
          next()
        }
          catch(e){
      console.log(e);
      res.status(500).json({
        message:'Unauthorized'
      })
      
    }
}




async function getMusic(req,res){
  let token=req.cookies.token
    if(!token){
    return  res.status(401).json({
        message:"unauthorized"
      })
    }

    const decoded=jwt.verify(token, process.env.SECRET_JWT)
    if(decoded.role !== 'user'){
     return res.status(401).json({
        message:'Unauthorized'
      })
    }

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

module.exports={authartist, getMusic}