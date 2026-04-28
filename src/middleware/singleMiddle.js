
const musicSchema=require('../models/music.model')

async function single(req,res) {
    try{
        let {id}=req.params
        const detail= await musicSchema.findById({_id:id}).populate('artist', 'username')
        res.status(200).json({
            message:"Successfull get by single",
            detail
        })
    }

    catch(err){
        res.status(500).json({
            message:"Not exist"
        })
    }
}


module.exports={single}