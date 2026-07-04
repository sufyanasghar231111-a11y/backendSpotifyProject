const postSchema = require('../models/post.model')
const jwt = require('jsonwebtoken')
const cookies = require('cookie-parser')
const bcrypt = require('bcryptjs')
const uploadPfp = require('../services/auth.service')
const logoutSchema = require('../models/logout.model')
const crypto = require('crypto')
const {otpGenerate, otpHtml}=require('../utils/email.util')
const sendEmail=require('../services/email.service')
const otpSchema=require('../models/otp.model')
const otpModel = require('../models/otp.model')

async function register(req, res) {
    const { username, email, password, role = 'user' } = req.body

    if (!username || !email || !password) {
        return res.status(400).json({
            success: false,
            message: "All fields required"
        });
    }

    let imagUrl = ''
    if (req.file) {
        const result = await uploadPfp(req.file.buffer)
        imagUrl = result.url
    }

    const alreadyExist = await postSchema.findOne({
        $or: [
            { username },
            { email }
        ]
    })

    if (alreadyExist) {
        return res.status(409).json({
            message: 'Already exist'
        })
    }

    const hashPassword = await bcrypt.hash(password, 10)

    const user = await postSchema.create({
        username,
        email,
        password: hashPassword,
        role,
        pfp: imagUrl
    })

    const otp=otpGenerate()
    const html=otpHtml(otp)

    await sendEmail(email, 'OTP Verification', `Your otp is ${otp}`, html)

    const otpHash=crypto.createHash('sha256').update(otp.toString()).digest('hex')

  await otpModel.create({
        user:user._id,
        email,
        otpHash
    })

    res.status(201).json({
        success: true,
        message: 'Successful register',
        user: {
            username: user.username,
            email: user.email,
            role: user.role,
            pfp: imagUrl,
            verified:user.verified
        }
    })
}

async function login(req, res) {
    try {
        const { username, email, password, role } = req.body

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields required"
            });
        }

        const user = await postSchema.findOne({
            $or: [
                { username },
                { email }
            ]
        })

        if (!user) {
            return res.status(404).json({
                message: 'user not found'
            })
        }

        if(!user.verified){
            return res.status(400).json({
                message:"Invalid user"
            })
        }

        const comparePassword = await bcrypt.compare(password, user.password)
        if (!comparePassword) {
            return res.status(401).json({
                message: "Unauthorized"
            })
        }

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
            secure: false,
            sameSite: 'lax',
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        res.status(201).json({
            message: "successful",
            _id: user._id,
            success: true,
            message: "Successful login",
            username: user.username,
            email: user.email,
            role: user.role,
            pfp: user.pfp,
            accessToken,
        })
    }
    catch (e) {
        res.status(500).json({
            message: "Internal error",
            error: e.message
        })
    }
}

async function getUser(req, res) {
    try {
        const getAuthData = await postSchema.findById(req.user.id)
        res.status(200).json({
            message: "Successful get data",
            getAuthData: {
                _id: getAuthData._id,
                username: getAuthData.username,
                email: getAuthData.email,
                role: getAuthData.role,
                pfp: getAuthData.pfp
            }
        })
    }
    catch (err) {
        res.status(500).json({
            message: "Error in your Response"
        })
    }
}

async function updatePfp(req, res) {
    try {
        let { username } = req.body


        const result = await uploadPfp(req.file.buffer)
        const user = await postSchema.findByIdAndUpdate(
            req.user.id, {
            username,
            pfp: result.url
        },
            { new: true }
        )

        res.status(200).json({
            message: "successfull update image",
            pfp: user.pfp,
            username
        })
    }
    catch (err) {
        res.status(500).json({
            message: "Invalid Pfp"
        })
    }
}

async function removePfp(req, res) {
    try {
        let imageurl = ''
        if (req.file) {
            const pfp = await uploadPfp(req.file.buffer)
            imageurl = pfp
        }
        let deletePfp = await postSchema.findByIdAndUpdate(
            req.user.id, {
            pfp: imageurl
        },

            { returnDocument: 'after' }
        )

        res.status(200).json({
            message: "successful delete pfp",
            deletePfp
        })
    }
    catch (err) {
        res.status(500).json({
            message: "Error in your request",
            error: err.message
        })
    }

}

module.exports = { register, login, getUser, updatePfp, removePfp }
