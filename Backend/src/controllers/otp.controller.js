const postSchema = require('../models/post.model')
const otpSchema = require('../models/otp.model')
const jwt = require('jsonwebtoken')
const logoutSchema = require('../models/logout.model')
const crypto = require('crypto')
const config = require('../config/config')

const verifyEmail = async (req, res) => {
    try {
        const { otpHash, email } = req.body

        const otp = crypto.createHash('sha256').update(String(otpHash)).digest('hex')

        const findOtp = await otpSchema.findOne({
            otpHash: otp,
            email,
            expiresAt: { $gt: Date.now() }
        })

        if (!findOtp) {
            return res.status(400).json({
                message: "Invalid otp"
            })
        }

        const user = await postSchema.findByIdAndUpdate(findOtp.user, {
            verified: true,
            expiresAt:null
        },
            {
                new: true
            }
        )

        if (!user) {
            return res.status(400).json({
                message: "User not found or registration expired"
            })
        }

        await otpSchema.deleteMany({
            user: findOtp.user
        })


        const refreshToken = jwt.sign({
            id: user._id,
            role: user.role
        }, config.SECRET_JWT, {
            expiresIn: '7d'
        })

        const refreshTokenHash = crypto.createHash('sha256').update(refreshToken).digest('hex')

        const session = await logoutSchema.create({
            user: user._id,
            refreshTokenHash,
            ip: req.ip,
            userAgent: req.headers['user-agent']
        })

        const accessToken = jwt.sign(
            {
                id: user._id,
                role: user.role,
                sessionId: session._id
            },
            config.ACCESS_TOKEN,
            {
                expiresIn: '10m'
            }
        )

        await postSchema.findByIdAndUpdate(user._id, {
            lastActive: new Date(),
            isOnline: true,
            isActive: true
        })

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        res.status(200).json({
            message: "successfull register",
            user: {
                _id: user._id,
                username: user.username,
                email: user.email,
                role: user.role,
                verified: user.verified,
                pfp: user.pfp
            },
            accessToken
        })

    }
    catch (err) {
        res.status(500).json({
            message: "Internal Error",
            error: err.message
        })
    }
}

const otpSession = async (req, res ) => {
    try{
        const token = req.cookies.tokenRegister

        if(!token){
          return  res.status(401).json({
                message:"Token is Not Provide"
            })
        }
        const decoded = jwt.verify(token, config.SECRET_JWT)

        const user = await postSchema.findOne({
            _id:decoded.userId,
            verified:false
        })

        if(!user){
            return res.status(401).json({
                message:'Otp session is expired'
            })
        }

        res.status(200).json({
            success:true,
            email:user.email
        })

    }
    catch(err){
        res.status(401).json({
            message:"Otp session is expired"
        })
    }
}

module.exports = { verifyEmail, otpSession }
