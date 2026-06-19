const currentPlaying=require('../models/currentplaying.model')

async function createCurr(req,res) {
    try{
        const {music,currentTime,duration}=req.body || {}

        const createCurrentPlaying=await currentPlaying.create(
            {
                user:req.user.id,
                music,
                currentTime,
                duration
            }
        )
        res.status(201).json({
            message:"successful create",
            createCurrentPlaying
        })
    }
    catch(err){
        res.status(500).json({
            message:"Error in your request",
            error:err.message
        })
    }
}

async function getCurr(req,res){
    try{
        const getCurrentPlaying=await currentPlaying.find({user:req.user.id}).populate({path:'music', populate:{path:"artist", select:'_id username'}})

        res.status(200).json({
            message:"successful get music",
            getCurrentPlaying
        })

    }
    catch(err){
        res.status(500).json({
            message:"Error in your request",
            error:err.message
        })
    }
}

async function patchCurr(req,res){
    try{
        const {id}=req.params
        const currentTime=req.body.currentTime
        const duration=req.body.duration
        const patchCurrentPlaying=await currentPlaying.findOneAndUpdate(
            {user:req.user.id},
            
            {
                music:id,
                currentTime:currentTime,
                duration:duration
            },
            {
                new :true,
                upsert:true
            }
        )
        res.status(200).json({
            message:"successful patch",
            patchCurrentPlaying
        })
    }
    catch(err){
        res.status(500).json({
            message:"Error in Request",
            error:err.message
        })
    }
}

module.exports={createCurr,getCurr,patchCurr}