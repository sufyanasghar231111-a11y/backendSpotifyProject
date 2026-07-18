const requestSchema = require("../models/userrequest.model")
const postSchema = require('../models/post.model')

const sendRequest = async (req, res) => {
    try {
        const { requestDescription } = req.body

        if (!requestDescription) {
            return res.status(400).json({
                message: "Invalid request"
            })
        }

        const Status = await requestSchema.findOne({
            user: req.user.id
        })

        if (Status?.requestStatus === 'Pending') {
            return res.status(409).json({
                message: "Your artist request is under review. Please wait for the admin's response"
            })
        }

        if (Status?.requestStatus === 'Approved') {
            return res.status(409).json({
                message: "You are already an artist."
            })
        }

        const sendrequest = await requestSchema.create(
            {
                user: req.user.id,
                requestDescription
            }
        )

        res.status(201).json({
            status: true,
            message: "successful",
            sendrequest
        })
    }
    catch (err) {
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

const getRequest = async (req, res) => {
    try {
        const getrequest = await requestSchema.find().populate('user', '_id username pfp role ')
        res.status(200).json({
            status: true,
            message: "successful get",
            getrequest
        })
    }
    catch (err) {
        res.status(500).json({
            message: "Internal Server Error",
            error: err.message
        })
    }
}

const updateRequest = async (req, res) => {
    try {
        const { id } = req.params
        const request = await requestSchema.findByIdAndUpdate(
            id,
            {
                requestStatus:'Approved'
            },
            {
                new:true
            }
        )

       const data=  await postSchema.findByIdAndUpdate(
            request.user,
               {
                    role:'artist'
                }
             ,
             {
                new: true
             }
        )

        res.status(200).json({
            message:"sucessful update",
        })
    }
    catch (err) {
        res.status(500).json({
            message: "Internal error"
        })
    }
}

const deleteRequest = async (req, res) => {
    try{
        const { id } = req.params

        const deleterequest = await requestSchema.findByIdAndUpdate(
            id, 
            {
               requestStatus: 'Rejected'
            },
            {
                new:true
            }
        )

        res.status(200).json({
            message:"successful reject",
            deleterequest
        })
    }
    catch(err){
        res.status(500).json({
            message:"Internal error"
        })
    }
}


const deleteRejected = async (req, res) => {
    try{
        const { id } = req.params

        const deleterequest = await requestSchema.findByIdAndDelete(id)

        res.status(200).json({
            message:"successful reject",
            deleterequest
        })
    }
    catch(err){
        res.status(500).json({
            message:"Internal error"
        })
    }
}




module.exports = { sendRequest, getRequest, updateRequest, deleteRequest, deleteRejected }