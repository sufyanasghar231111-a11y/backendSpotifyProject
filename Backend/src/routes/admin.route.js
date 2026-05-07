const express=require('express')

const adminroute=express.Router()
const middleware=require('../middleware/middle')
const routeController=require('../controllers/admincontroller')

adminroute.get('/artists', middleware.adminMan, routeController.adminCheckArtist )
adminroute.get('/users', middleware.adminMan, routeController.adminCheckUser )
adminroute.get('/allalbum', middleware.adminMan, routeController.allAlbum)
adminroute.get('/artists/:id/album', middleware.adminMan,routeController.particularAlbum)
adminroute.delete('/deleteMusic/:dataId/:albumId', middleware.adminMan, routeController.deleteArtistAlbum)

module.exports=adminroute