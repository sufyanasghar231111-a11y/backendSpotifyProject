const express=require('express')
const controller=require('../controllers/refreshRotation.controller')
const rotationRoute=express.Router()

rotationRoute.get('/refresh-token',controller.refreshTokenRotation)
rotationRoute.get('/logoutAll',controller.logoutAll)

module.exports=rotationRoute