const express=require('express')
const multer= require('multer')
const routeMusic=express()
const upload= multer({storage: multer.memoryStorage()})
const controlMusic=require('../controllers/music.controller')
const controlAlbum=require('../controllers/music.controller')
const middleware=require('../middleware/middle')
const getController=require('../controllers/music.controller')


routeMusic.post('/music',  middleware.authartist ,  upload.single('file'), controlMusic.music)
routeMusic.post('/album', middleware.authartist ,  controlAlbum.Album )

routeMusic.get('/getMusic' , getController.getMusic )
routeMusic.get('/singleMusic/:id', getController.single)
routeMusic.get('/allAlbum', getController.allAlbum)
routeMusic.get('/allAlbum/:id', getController.detail)
routeMusic.get('/particularAlbum', middleware.authartist, getController.particularArtist)

routeMusic.delete('/deleteMusic/:albumId/:musicId', middleware.authartist, getController.deleteMusic )

routeMusic.patch('/updateMusic/:albumId',  middleware.authartist , getController.updateMusic)
module.exports=routeMusic