const requestSchema = require("../models/userrequest.model")
const postSchema = require('../models/post.model')
const notificationSchema = require('../models/Notification.model')

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
       
        const getrequest = await requestSchema.find()
        .sort({createdAt:-1})
        .populate('user', '_id username pfp role email')
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

const getSingleRequest = async (req, res) => {
    try{
        const {id} = req.params
        const getSingle = await requestSchema.findById({_id:id, user:req.user.id}).populate('user', '_id username pfp')
        getSingle.isChecked=true
        await getSingle.save()
        res.status(200).json({
            message:"Successful get",
            getSingle
        })
    }
    catch (err) {
        res.status(500).json({
            message: "Internal error"
        })
    }
}

const updateRequest = async (req, res) => {
    try {
        const { id } = req.params
        const request = await requestSchema.findByIdAndUpdate(
            id,
            {
                requestStatus: 'Approved'
            },
            {
                new: true
            }
        )

        const data = await postSchema.findByIdAndUpdate(
            request.user,
            {
                role: 'artist',
                artistApprovedAt:new Date()
            }
            ,
            {
                new: true
            }
        )

        

      const data1=  await notificationSchema.create({
            user: request.user,
            title: "Artist Request Approved",
            message: "Congratulations! Your request has been approved. You are now an artist.",
            isApproved : true
        });

        res.status(200).json({
            message: "sucessful update",
            data1
        })
    }
    catch (err) {
        res.status(500).json({
            message: "Internal error"
        })
    }
}


const deleteRejected = async (req, res) => {
    try {
        const { id } = req.params

        const deleterequest = await requestSchema.findByIdAndDelete(id)

        await notificationSchema.create(
            {
                user: deleterequest.user,
                title: "Artist Request Rejected",
                message: "Your request to become an artist has been rejected by the admin.",
                isApproved: false
            }
        )

        res.status(200).json({
            message: "successful reject",
            deleterequest
        })
    }
    catch (err) {
        res.status(500).json({
            message: "Internal error"
        })
    }
}


const getNotification = async (req, res) => {
    try {
        const response = await notificationSchema.find({ user: req.user.id }).sort({createdAt:-1}).populate({path:'user', select: 'username role _id'})
        res.status(200).json({
            message: "Successful get",
            response
        })
    }
    catch (err) {
        res.status(500).json({
            message: "Internal error"
        })
    }
}

const updateNotification = async ( req, res) =>{
    const { id } = req.params
    try{
        const updateData =await notificationSchema.findById({user:req.user.id, _id:id}).populate('user', '_id username')
        updateData.isRead= true
        await updateData.save()
        res.status(201).json({
            message:"Successful update",
            updateData
        })
    }
    catch{
        res.status(500).json({
            message:'Internal error'
        })
    }
}




module.exports = { sendRequest, getRequest, updateRequest, deleteRejected, getNotification, getSingleRequest, updateNotification }