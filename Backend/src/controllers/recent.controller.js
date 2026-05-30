const recentWatchSchema=require('../models/recent.model')
 

async function createRecent(req,res){
    try{
        
        let {songs,album}=req.body || {}
        const create=await recentWatchSchema.create({
            songs,
            user:req.user.id
        })

        res.status(201).json({
            message:"successful create recent",
            create
        })
    }
    catch(err){
        res.status(500).json({
            message:"error in res",
            error:err.message
        })
    }
}

async function getRecent(req,res){
    try{
        const get=await recentWatchSchema.find()
        res.status(200).json({
            message:"successful get",
            get
        })
    }
    catch(e){
        res.status(500).json({
            message:"wrong request",
            error:e.message
        })
    }
}

async function updateRecent(req,res){
    try{

    }
    catch(err){
        
    }
}

module.exports={createRecent, getRecent}