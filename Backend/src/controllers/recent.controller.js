const recentWatchSchema=require('../models/recent.model')
 

async function createRecent(req,res){
    try{
        
        let {songs,album}=req.body || {}
        const create=await recentWatchSchema.create({
            songs,
            album,
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
        const get=await recentWatchSchema.find().populate({path:'songs.item', populate:{path:'artist'}}).populate({path:"album.item", populate:{path:'artist'}})
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
                {songs:{item:id}}
            }
        )
      
        const update=await recentWatchSchema.findOneAndUpdate(
            {user:req.user.id},
            {
                $push:{
                    songs:{
                        $each:[{item:id, createdAt:new Date}],
                        $position:0
                    }
                }    
            },
            {
                returnDocument:'after'
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

async function updateRecentAlbum(req,res){
    try{
        const {id}=req.params

        await recentWatchSchema.findOneAndUpdate(
            {user:req.user.id}
            ,
            {
                $pull:
                {album:{item:id}}
            }
        )
      
        const update=await recentWatchSchema.findOneAndUpdate(
            {user:req.user.id},
            {
                 
                $push:{
                    album:{
                        $each:[{item:id, createdAt:new Date}],
                        $position:0
                    }
                }    
            },

            {
                returnDocument:'after'
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
                    songs:{item:id}  ,
                    album:{item:id} 
                }
            },
            {
                returnDocument:'after'
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



module.exports={createRecent, getRecent,updateRecent,deleteRecent,updateRecentAlbum}