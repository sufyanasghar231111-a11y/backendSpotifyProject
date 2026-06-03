const { populate } = require("../models/album.model")
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
        const getSearchItem=await recentSearch.find().populate({path:'songs.item', populate:{path:"artist", select:'username _id' }}).populate({path:'album.item',populate:{path:'artist', select:'_id, username'} })
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

         await recentSearch.findOneAndUpdate(
            {user:req.user.id},
            {
                $pull:{
                    songs:{item:id}
                }
            },
            {
                returnDocument:'after'
            }
        )

        const pushRecentSearch= await recentSearch.findOneAndUpdate(
            {user:req.user.id},
            {
                $push:{
                    songs:{
                        $each:[{ item:id,createdAt:new Date}],
                        $position:0
                    }
                }
            }
            ,{
                returnDocument:'after'
            }
        )
        
        res.status(200).json({
            message:"successful update get Music",
            pushRecentSearch
        })
    }
    catch(err){
        res.status(500).json({
            message:'Internal Server Error',
            error:err.message
        })
    }
}
async function patchRecentAlbum(req,res){
    let {id}=req.params
    try{

         await recentSearch.findOneAndUpdate(
            {user:req.user.id},
            {
                $pull:{
                    album:{item:id}
                }
            },
            {
                returnDocument:'after'
            }
        )

        const pushRecentSearch= await recentSearch.findOneAndUpdate(
            {user:req.user.id},
            {
                $push:{
                    album:{
                        $each:[{ item:id,createdAt:new Date}],
                        $position:0
                    }
                }
            }
            ,{
                returnDocument:'after'
            }
        )
        
        res.status(200).json({
            message:"successful update get Music",
            pushRecentSearch
        })
    }
    catch(err){
        res.status(500).json({
            message:'Internal Server Error',
            error:err.message
        })
    }
}

async function deleteRecentSearch(req,res){
    try{
        let {id}=req.params
        const deleteSearch=await recentSearch.findOneAndUpdate(
            {user:req.user.id},
            {
                $pull:{
                    songs:{item:id},
                    album:{item:id}
                },
            }
            ,
            {
                returnDocument:'after'
            }
        )
        res.status(200).json({
            message:"successful delete recent search",
            deleteSearch
        })
    }
    catch(err){
        res.status(500).json({
            message:"Internal Server Error",
            error:err.message
        })
    }
}

module.exports={createRecentSearch,getRecentSearch,patchRecentSearch,patchRecentAlbum,deleteRecentSearch}