const currentPlaying=require('../models/currentplaying.model')

async function createCurr(req,res) {
    try{
        const {music}=req.body || {}

        const createCurrentPlaying=await currentPlaying.create(
            {
                user:req.user.id,
                music
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
        const getCurrentPlaying=await currentPlaying.find({user:req.user.id}).populate('music')

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
        let {id}=req.params

        const patchCurrentPlaying=await currentPlaying.findOneAndUpdate(
            {user:req.user.id},
            {
                music:id
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