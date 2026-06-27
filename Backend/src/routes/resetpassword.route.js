const express= require('express')
const resetRoute=express.Router()
const resetPassword=require('../controllers/resetpassword.controller')

resetRoute.post('/postreset', resetPassword.checkAuth)
resetRoute.post('/resetpassword/:token', resetPassword.resetPage)


module.exports=resetRoute