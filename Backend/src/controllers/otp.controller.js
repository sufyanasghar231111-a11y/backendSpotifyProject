const postSchema = require('../models/post.model')
const otpSchema = require('../models/otp.model')
const jwt = require('jsonwebtoken')
const logoutSchema=require('../models/logout.model')
const crypto = require('crypto')

const verifyEmail = async (req, res) => {
    try {
        const { otpHash, email } = req.body

        const otp = crypto.createHash('sha256').update(String(otpHash)).digest('hex')

        const findOtp = await otpSchema.findOne({
            otpHash: otp,
            email
        })

        if (!findOtp) {
            return res.status(400).json({
                message: "Invalid otp"
            })
        }

        const user = await postSchema.findByIdAndUpdate(findOtp.user, {
            verified: true
        },
            {
                new: true
            }
        )

        await otpSchema.deleteMany({
            user: findOtp.user
        })


        const refreshToken = jwt.sign({
            id: user._id,
            role: user.role
        }, process.env.SECRET_JWT, {
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
            process.env.ACCESS_TOKEN,
            {
                expiresIn: '10m'
            }
        )

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        res.status(200).json({
            message: "successfull register",
            user:{
                username:user.username,
                email:user.email,
                role:user.role
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

module.exports = { verifyEmail }
