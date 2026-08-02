const express=require('express')
const controller=require('../controllers/refreshRotation.controller')
const rotationRoute=express.Router()
const middleware = require('../middleware/middle')

rotationRoute.get('/refresh-token',controller.refreshTokenRotation)
rotationRoute.get('/logoutAll',middleware.auth ,controller.logoutAll)

module.exports=rotationRoute