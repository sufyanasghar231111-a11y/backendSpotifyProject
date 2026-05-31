const express=require('express')
const controller=require('../controllers/recent.controller')
const middleware=require('../middleware/middle')
const route=express.Router()

route.post('/createrecent', middleware.getMusic,  controller.createRecent)
route.get('/getrecent',middleware.getMusic,  controller.getRecent )
route.patch('/updaterecent/:id',middleware.getMusic,  controller.updateRecent )
route.delete('/deleterecent/:id',middleware.getMusic,  controller.deleteRecent )
route.patch('/updateRecentAlbum/:id',middleware.getMusic,  controller.updateRecentAlbum )

module.exports=route