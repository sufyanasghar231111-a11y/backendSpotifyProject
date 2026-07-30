const express=require('express')
const controller=require('../controllers/recent.controller')
const middleware=require('../middleware/middle')
const route=express.Router()

route.post('/createrecent', middleware.authorize('user', 'artist'),  controller.createRecent)
route.get('/getrecent',middleware.authorize('user', 'artist'),  controller.getRecent )
route.patch('/updaterecent/:id',middleware.authorize('user', 'artist'),  controller.updateRecent )
route.delete('/deleterecent/:id',middleware.authorize('user', 'artist'),  controller.deleteRecent )
route.patch('/updateRecentAlbum/:id',middleware.authorize('user', 'artist'),  controller.updateRecentAlbum )

module.exports=route