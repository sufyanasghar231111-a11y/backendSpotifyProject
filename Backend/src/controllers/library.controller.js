const librarySchema=require('../models/Library.model')

async function createLibrary(req,res){
    try{

        let {music}=req.body

        const createLib=await librarySchema.create({
            music,
            user:req.user.id
        })
        res.status(201).json({
            message:"successful post lib",
            createLib
        })
    }
    catch(err){
        res.status(500).json({
            message:"Error in request"
        })
    }
}

async function getLibrary(req,res){
    try{

        const getLib=await librarySchema.find({user:req.user.id}).populate('music').populate({path:'music',populate:{path:"artist"}}).populate('user')
        res.status(200).json({
            message:"successful get",
            getLib
        })
    }
    catch(e){
        res.status(500).json({
            message:"Error in request",
            error:e.message
        })
    }
}

async function addTolab(req,res){
    
    let {musicId}=req.params
    try{
        const library=await librarySchema.findOneAndUpdate(
            {
                user:req.user.id
            },
            {
                $addToSet:{
                    music:musicId
                }
            },
            {
                upsert:true,
                returnDocument:'after'
            }
        )
        res.status(200).json({
            message:"Successful get user",
            library
        })
    }
    catch(err){
        res.status(500).json({
            message:"Error in your res"
        })
    }
}

async function deleteLab(req,res){
    // let {getLib}=req.params
    let {musicId}=req.params
    try{
        const library=await librarySchema.findOneAndUpdate(
            {
            //    _id:getLib,
                user:req.user.id
            },
            {
                $pull:{
                    music:musicId
                }
            }
        )
        res.status(200).json({
            message:"Successful get user",
            library
        })
    }
    catch(err){
        res.status(500).json({
            message:"Error in your res",
            error:err.message
        })
    }
}


module.exports={createLibrary,getLibrary, addTolab,deleteLab}