const express=require('express')
const controller=require('../controllers/otp.controller')
const otpRoute=express.Router()

otpRoute.post('/email-verify', controller.verifyEmail)

otpRoute.get('/check-otp-session', controller.otpSession)

module.exports=otpRoute