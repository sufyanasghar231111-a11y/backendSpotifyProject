const postSchema=require('../models/post.model')
const jwt= require('jsonwebtoken')
const cookies=require('cookie-parser')
const bcrypt=require('bcryptjs')

async function register(req,res) {
    const {username, email, password , role='user'}=req.body
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
        role
    })

    const token = jwt.sign({
        id:user._id,
        role:user.role
    },process.env.SECRET_JWT)

    res.cookie('token', token)

    res.status(201).json({
        success:true,
        message:'Successful register',
        user:{
            username:user.username,
            email:user.email,
            role:user.role
        }
    })
}

async function login(req,res) {
    const {username, email, password, role}=req.body

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
    }, process.env.SECRET_JWT)
    res.cookie('token', token)

    res.status(201).json({
        success:true,
        message:"successful Login",
        username:user.username,
        email:user.email,
        role:user.role,

    })
}

module.exports={register,login}
