const express=require('express')

const adminroute=express.Router()
const middleware=require('../middleware/middle')
const routeController=require('../controllers/admincontroller')

adminroute.get('/allartist', middleware.adminMan, routeController.adminCheckArtist )
adminroute.get('/alluser', middleware.adminMan, routeController.adminCheckUser )

module.exports=adminroute