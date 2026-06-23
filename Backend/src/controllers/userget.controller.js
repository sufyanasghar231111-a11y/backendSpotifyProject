const postSchema=require('../models/post.model')

const getAllUser=async (req,res) => {
    try{
        const getUser=await postSchema.find({
            $or:[
                {role:'artist'},
                {role:'user'}
             ]
        })

        res.status(200).json({
            message:"Successful get data",
            getUser
        })
    }
    catch(err){
        res.status(500).json({
        message:"Error in your Request"
        })
    }
}

const getSingle = async (req, res) =>{
    try{
        const {id}=req.params
        const singleGet= await postSchema.find({_id:id})
        res.status(200).json({
            message:"successfull get",
            singleGet       
        })
    }
    catch(err){
        res.status(500).json({
            message:"Invalid in your Request"
        })
    }
}

module.exports={getAllUser,getSingle}