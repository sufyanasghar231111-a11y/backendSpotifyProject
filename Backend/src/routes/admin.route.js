const express=require('express')

const adminroute=express.Router()
const middleware=require('../middleware/middle')
const routeController=require('../controllers/admincontroller')

adminroute.get('/allartist', middleware.adminMan, routeController.adminCheckArtist )
adminroute.get('/alluser', middleware.adminMan, routeController.adminCheckUser )
adminroute.get('/allalbum', middleware.adminMan, routeController.allAlbum)

module.exports=adminroute