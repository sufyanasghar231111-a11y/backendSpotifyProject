const jwt=require('jsonwebtoken')

async function  tokenExpire(req,res,next) {
    const token=req.cookie.token
    
}