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
    
          if(decoded.role !== 'admin' && decoded.role !== 'artist' ){
            res.status(403).json({
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


async function getMusic(req,res,next){
  try{

    let token=req.cookies.token
    if(!token){
      return  res.status(401).json({
        message:"unauthorized"
      })
    }
    
    const decoded=jwt.verify(token, process.env.SECRET_JWT)
    if(decoded.role !== 'user'  ){
      return res.status(401).json({
        message:'Unauthorized'
      })
    }
    req.user=decoded
    next()
  }
  catch(err){
    res.status(401).json({
      message:"Unauthorized"
    })
  }



}

// async function adminRole(req,res,next){
//   try{

//     const token= req.cookies.token
//     if(!token){
//       return  res.status(401).json({
//         message:"unauthorized"
//       })
//     }
//     const decoded=jwt.verify(token,process.env.SECRET_JWT)

//     if(decoded.role !== 'admin' ){
//      return res.status(403).json({
//         message:"Forbidden"
//       })
//     }
//     req.user=decoded
//     next()

//   }
//   catch(e){
//     res.status(500).json({
//       message:"the error in your data"
//     })
//   }
// }

module.exports={authartist, getMusic}