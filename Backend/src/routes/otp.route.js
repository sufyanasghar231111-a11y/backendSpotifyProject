const express=require('express')
const controller=require('../controllers/otp.controller')
const otpRoute=express.Router()

otpRoute.post('/email-verify', controller.verifyEmail)

module.exports=otpRoute