const postSchema = require('../models/post.model')
const jwt = require('jsonwebtoken')
const cookies = require('cookie-parser')
const bcrypt = require('bcryptjs')
const uploadPfp = require('../services/auth.service')
const logoutSchema = require('../models/logout.model')
const crypto = require('crypto')
const { otpGenerate, otpHtml } = require('../utils/email.util')
const sendEmail = require('../services/email.service')
const otpSchema = require('../models/otp.model')
const otpModel = require('../models/otp.model')
const userSchema = require('../models/playlist.model')
const config = require('../config/config')
const AppError = require('../utils/AppError')

async function register(req, res) {
    const { username, email, password, role = 'user' } = req.body

    if (!username || !email || !password) {
        throw new AppError('All Fields Required', 400)
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
        throw new AppError('User Already Exist ', 409)
    }

    const hashPassword = await bcrypt.hash(password, 10)

    const user = await postSchema.create({
        username,
        email,
        password: hashPassword,
        role,
        pfp: imagUrl,
        verified: false,
        expiresAt: new Date(Date.now() + 15 * 60 * 1000)
    })

    const otp = otpGenerate()
    const html = otpHtml(otp)

    await sendEmail(email, 'OTP Verification', `Your otp is ${otp}`, html)

    const otpHash = crypto.createHash('sha256').update(otp.toString()).digest('hex')

    await otpModel.create({
        user: user._id,
        email,
        otpHash,
        expiresAt: new Date(Date.now() + 15 * 60 * 1000)
    })


    const tokenRegister = jwt.sign(
        {
            userId: user._id
        },
        config.SECRET_JWT,
        {
            expiresIn: '15m'
        }
    )

    res.cookie('tokenRegister', tokenRegister, {
        httpOnly: true,
        sameSite: 'lax',
        secure: false,
        maxAge: 15 * 60 * 1000
    })


    res.status(201).json({
        success: true,
        message: 'Successful register',
        user: {
            username: user.username,
            email: user.email,
            role: user.role,
            pfp: imagUrl,
            verified: user.verified
        }
    })
}

async function login(req, res) {

    const { username, email, password, role } = req.body

    if (!email || !password) {
        throw new AppError('All Field Required', 400)
    }

    const user = await postSchema.findOne({
        $or: [
            { username },
            { email }
        ]
    })

    if (!user) {
        throw new AppError('User is not found', 404)
    }

    if (!user.verified) {
        throw new AppError('User is not verify', 400)
    }

    if (!user.isActive) {
        throw new AppError('Your account has been blocked. Contact support.', 403)
    }

    const comparePassword = await bcrypt.compare(password, user.password)

    if (!comparePassword) {
        throw new AppError('Unauthorized', 401)
    }

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

    const online = await postSchema.findByIdAndUpdate(user._id, {
        lastActive: new Date(),
        isOnline: true,
        isActive: true
    })

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
        accessToken
    })

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
                pfp: getAuthData.pfp,
                isOnline: getAuthData.isOnline
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

        const updateData = {
            username
        }

        if (req.file) {
            const result = await uploadPfp(req.file.buffer)
            updateData.pfp = result.url
        }

        const user = await postSchema.findByIdAndUpdate(
            req.user.id, {
            $set:updateData
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
            message: "Internal error",
            err: err.message
        })
    }
}


async function updateAdminPfp(req, res) {
    try {
        let { username, email } = req.body

        const find = await postSchema.findOne(
            {
                _id: { $ne: req.user.id },
                $or: [
                    { username },
                    { email }
                ]
            }
        )

        if (find) {
            return res.status(409).json({
                message: "Email Already exist"
            })
        }

        const updateData = {
            username,
            email
        }

        if (req.file) {
            const result = await uploadPfp(req.file.buffer)
            updateData.pfp = result.url
        }
        const user = await postSchema.findByIdAndUpdate(
            req.user.id,
            updateData,
            { new: true }
        )

        res.status(200).json({
            message: "successfull update image",
            pfp: user.pfp,
            username,
            email
        })
    }
    catch (err) {
        res.status(500).json({
            message: "Internal error",
            error: err.message
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

module.exports = { register, login, getUser, updatePfp, removePfp, updateAdminPfp }
