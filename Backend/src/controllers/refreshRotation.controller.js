const jwt = require('jsonwebtoken')
const postSchema = require('../models/post.model')
const logoutSchema = require("../models/logout.model")
const crypto = require('crypto')

function generatedAccessToken(user,session) {
    return jwt.sign(
        {
            id: user._id,
            role: user.role,
            sessionId:session._id
        },
        process.env.ACCESS_TOKEN,
        {
            expiresIn: '10m'
        }
    )
}

function generatedRefreshToken(user) {
    return jwt.sign(
        {
            id: user._id,
            role: user.role
        },
        process.env.SECRET_JWT,
        {
            expiresIn: '7d'
        }
    )
}

const refreshTokenRotation = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken
        if (!refreshToken) {
            return res.status(401).json({
                message: "Token is missing"
            })
        }

        const decoded = jwt.verify(refreshToken, process.env.SECRET_JWT)
        
        const user = await postSchema.findById(decoded.id)
        
        if (!user) {
            return res.status(404).json({
                message: "user is not found"
            })
        }
        const refreshTokenHash= crypto.createHash('sha256').update(refreshToken).digest('hex')
        
        const session=await logoutSchema.findOne({
           refreshTokenHash:refreshTokenHash,
            revoke:false
        })

        if(!session){
            return res.status(401).json({
                message:"invalid token"
            })
        }

        const RefreshToken = generatedRefreshToken(user)

        const refreshHash= crypto.createHash('sha256').update(RefreshToken).digest('hex')

        session.refreshTokenHash=refreshHash,
        await session.save()

        const accessToken = generatedAccessToken(user, session)

        res.cookie('refreshToken', RefreshToken, {
            httpOnly: true,
            sameSite: "strict",
            secure: true,
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        res.status(200).json({
            message: "successful",
            accessToken,
            user: {
                _id: user._id,
                username: user.username,
                pfp: user.pfp,
                role: user.role
            }
        })
    }
    catch (err) {
        res.status(500).json({
            message: "Internal Error",
            error: err.message
        })
    }
}

const logoutAll = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken
        if (!refreshToken) {
            return res.status(401).json({
                message: "Token is not Provide"
            })
        }

        const refreshTokenHash = crypto.createHash('sha256').update(refreshToken).digest('hex')

        const getUser = await logoutSchema.updateMany({
            refreshTokenHash,
            revoke: false
        },
            {
                revoke: true
            }
        )

        res.clearCookie('refreshToken')

        res.status(200).json({
            message: "successful logout from all device"
        })
    }
    catch (err) {
        res.status(500).json({
            message: "Internal Error",
            error:err.message
        })
    }
}

module.exports = { refreshTokenRotation, logoutAll }