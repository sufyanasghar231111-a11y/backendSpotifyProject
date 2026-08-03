const express=require('express')

const adminroute=express.Router()
const middleware=require('../middleware/middle')
const routeController=require('../controllers/admincontroller')

adminroute.get('/admin-check-role', middleware.adminMan, routeController.adminCheckRole )
adminroute.get('/song-album-playlist', middleware.adminMan, routeController.totalContent)
adminroute.get('/count-song-album-playlist', middleware.adminMan, routeController.totalCount)
adminroute.get('/artists/:id/album', middleware.adminMan,routeController.particularAlbum)
adminroute.delete('/deleteMusic/:dataId/:albumId', middleware.adminMan, routeController.deleteArtistAlbum)

adminroute.patch('/blockartist/:id',middleware.adminMan, routeController.blockArtist )
adminroute.patch('/unblock/:id', middleware.adminMan,routeController.unblockArtist )

adminroute.patch('/blockUser/:id', middleware.adminMan, routeController.blockUser)
adminroute.patch('/unblockuser/:id', middleware.adminMan, routeController.unblockUser)


module.exports=adminroute