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
        const get=await recentWatchSchema.find().sort({createdAt:-1}).populate('songs').populate({path:'songs', populate:{path:'artist'}})
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
        const {id}=req.params

        await recentWatchSchema.findOneAndUpdate(
            {user:req.user.id}
            ,
            {
                $pull:
                {songs:id }
            }
        )
      
        const update=await recentWatchSchema.findOneAndUpdate(
            {user:req.user.id},
            {
                $push:{
                    songs:{_id:id}   
                }    
            },
            {
                new:true
            }
        )
        res.status(200).json({
            message:"successful update",
            update
        })
    }
    catch(err){
        res.status(500).json({
            message:"Error in Res",
            error:err.message
        })
    }
}
async function deleteRecent(req,res){
    try{
        const {id}=req.params
        const deletere=await recentWatchSchema.findOneAndUpdate(
            {user:req.user.id},
            {
                $pull:{
                    songs:id   
                }
            },
            {
                new:true
            }
        )
        res.status(200).json({
            message:"successful update",
            deletere
        })
    }
    catch(err){
        res.status(500).json({
            message:"Error in Res",
            error:err.message
        })
    }
}



module.exports={createRecent, getRecent,updateRecent,deleteRecent}