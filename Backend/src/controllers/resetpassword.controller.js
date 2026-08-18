const postSchema = require('../models/post.model')
const crypto = require('crypto')
const nodemailer = require('nodemailer')
const bcrypt=require('bcryptjs');
const config = require('../config/config');

async function checkAuth(req, res) {
    try {
        let { email } = req.body;
        const user = await postSchema.findOne({ email })
        // check user 
        if (!user) {
         return   res.status(401).json({
                message: "If the email exists, a reset link has been sent."
            })
        }

        // create token
        const token = crypto.randomBytes(32).toString('hex')
        const hashPassword = crypto.createHash('sha256').update(token).digest('hex')
                
        // save in db
        user.resetToken = hashPassword
        user.resetTokenExpire = Date.now() + 1000 * 60 * 15
        await user.save()

        // create Link 
        const link = `${config.FRONTEND_URL}/reset-password/${token}`;

        // send email
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port:465,
            secure:true,
            family:4,
            auth: {
                user: config.EMAIL,
                pass: config.EMAIL_PASS
            }
        })

        // html link
        await transporter.sendMail({
            to:email,
            subject:'Reset Password',
            html: `<a href='${link}'> Reset Link </a> `
        })

        res.status(200).json({
            message: "Reset link sent",
        });

    }
    catch (err) {
        res.status(500).json({
            message: "Internal server error",
        })
    }
}

async function resetPage(req, res){
    try{
        const {token}=req.params
        const {password}=req.body
        const hashToken=crypto.createHash('sha256').update(token).digest('hex')
        const user=await postSchema.findOne({
            resetToken:hashToken,
            resetTokenExpire: { $gt: Date.now() }
        })
        
        if(!user){
            return res.status(400).json({
                message:"Invalid or expire token"
            })
        }

        user.password=await bcrypt.hash(password, 10)
        user.resetToken=undefined;
        user.resetTokenExpire=undefined

        await user.save()

        res.status(201).json({
            message:"successful update password "
        })
    }
    catch(err){
        res.status(500).json({
            message:"Internal server error"
        })
    }
}

module.exports = { checkAuth, resetPage}