const postSchema=require('../models/post.model')
const jwt= require('jsonwebtoken')
const cookies=require('cookie-parser')
const bcrypt=require('bcryptjs')
const uploadPfp=require('../services/auth.service')

async function register(req,res) {
    const {username, email, password , role='user'}=req.body
         
        if (!username || !email || !password ) {
  return res.status(400).json({
    success: false,
    message: "All fields required"
  });
}

   let imagUrl=''
    if(req.file){
         const result=await uploadPfp(req.file.buffer)
         imagUrl=result.url
    }

    const alreadyExist= await postSchema.findOne({
        $or:[
            {username},
            {email}
        ]
    })

    if(alreadyExist){
       return res.status(409).json({
            message:'Already exist'
        })
    }

    const hashPassword= await bcrypt.hash(password,10)
   
    const user=await postSchema.create({
        username,
        email,
        password:hashPassword,
        role,
        pfp:imagUrl
        })

    const token = jwt.sign({
        id:user._id,
        role:user.role
    },process.env.SECRET_JWT,{
        expiresIn:'1h'
    })

    res.cookie('token', token,{
        httpOnly:true,
        secure:false,
        sameSite:'lax',
        maxAge:60 * 60 *1000
    })

    res.status(201).json({
        success:true,
        message:'Successful register',
        user:{
            username:user.username,
            email:user.email,
            role:user.role,
            token,
            pfp:imagUrl
        }
    })
}

async function login(req,res) {
    try{
        const {username, email, password, role}=req.body

        if ( ! email || !password ) {
  return res.status(400).json({
    success: false,
    message: "All fields required"
  });
}
        
        const user= await postSchema.findOne({
        $or:[
            {username},
            {email}
        ]
    })

    if(!user){
      return  res.status(401).json({
            message:'UnAuthorized'
        })
    }

     const comparePassword= await bcrypt.compare(password, user.password)
    if(!comparePassword){
       return  res.status(401).json({
            message:"Unauthorized"
        })
    }

    const token=  jwt.sign({
        id:user._id,
        role:user.role
    }, process.env.SECRET_JWT, {
        expiresIn:'1h'
    })
    res.cookie('token', token,{
        httpOnly:true,
        secure:false,
        sameSite:'lax',
        maxAge:60*60*1000
    })

    res.status(201).json({
        id: user._id,
        success:true,
        message:"Successful login",
        username:user.username,
        email:user.email,
        role:user.role,
        password:user.password,
        token,
        pfp:user.pfp
    })
}
catch(e){
    res.status(500).json({
        message:"Invalid"
    })
}
}

async function getUser(req,res){
    try{
        const getAuthData=await postSchema.findById(req.user.id)
        res.status(200).json({
            message:"Successful get data",
            getAuthData
        })
    }
    catch(err){
        res.status(500).json({
            message:"Error in your Response"
        })
    }
}

async function updatePfp(req,res){
    try{
        let {username}=req.body
        
        
        const result=await uploadPfp(req.file.buffer)
        const user=await postSchema.findByIdAndUpdate(
            req.user.id,{
                username,
                pfp:result.url
            },
            {new:true}
        )

        res.status(200).json({
            message:"successfull update image",
            pfp: user.pfp,
            username
        })
    }
    catch(err){
        res.status(500).json({
            message:"Invalid Pfp"
        })
    }
}

async function removePfp(req,res){
    try{
        let imageurl=''
        if(req.file){
            const pfp=await uploadPfp(req.file.buffer)
            imageurl=pfp
        }
        let deletePfp=await postSchema.findByIdAndUpdate(
            req.user.id,{
                pfp:imageurl
            },

            {returnDocument: 'after'}
        )

        res.status(200).json({
            message:"successful delete pfp",
            deletePfp
        })
    }
    catch(err){
        res.status(500).json({
            message:"Error in your request",
            error:err.message
        })
    }
    
}

module.exports={register,login,getUser,updatePfp,removePfp}
