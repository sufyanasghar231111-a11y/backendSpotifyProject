const recentSearch=require("../models/recentsearch.model")

async function createRecentSearch(req,res){
    try{
     const {songs,album}=req.body || {}
     const recentSearchItem=await recentSearch.create({
        songs,
        album,
        user:req.user.id
     })
     res.status(201).json({
        message:"successfull create recent search",
        recentSearchItem
     })
    }
    catch(err){
        res.status(500).json({
            message:"Internal Server Error",
            error:err.message
        })
    }
}

async function getRecentSearch(req,res){
    try{
        const getSearchItem=await recentSearch.find()
        res.status(200).json({
            message:"successful get recent search",
            getSearchItem
        })
    }
    catch(err){
        res.status(500).json({
            message:"Internal Server Error",
            error:err.message
        })
    }
}

async function patchRecentSearch(req,res){
    let {id}=req.params
    try{
        const pullAll=await recentSearch.findOneAndUpdate(
            {user:req.user.id},
            {
                $pull:{
                    songs:{item:id}
                }
            },
            {
                
            }
        )

        const pushRecentSearch= await recentSearch.findOneAndUpdate(
            {user:req.user.id},

        )
    }
    catch(err){
        res.status(500).json({
            message:'Internal Server Error',
            error:err.message
        })
    }
}

module.exports={createRecentSearch,getRecentSearch,patchRecentSearch}