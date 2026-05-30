const express=require('express')
const controller=require('../controllers/recent.controller')
const middleware=require('../middleware/middle')
const route=express.Router()

route.post('/createrecent', middleware.getMusic,  controller.createRecent)
route.get('/getrecent',middleware.getMusic,  controller.getRecent )

module.exports=route