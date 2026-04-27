const jwt=require('jsonwebtoken')

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

module.exports={authartist}