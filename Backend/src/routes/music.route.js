const express=require('express')
const multer= require('multer')
const routeMusic=express.Router()
const upload= multer({storage: multer.memoryStorage()})
const controlMusic=require('../controllers/music.controller')
const controlAlbum=require('../controllers/music.controller')
const middleware=require('../middleware/middle')
const getController=require('../controllers/music.controller')


routeMusic.post('/music',  middleware.authartist ,  upload.single('file') , controlMusic.music)
routeMusic.delete('/deleteSong/:id', middleware.authartist ,  controlAlbum.deleteSong )
routeMusic.post('/album', middleware.authartist ,  controlAlbum.Album )

routeMusic.get('/getmusicalbum' ,  getController.getBothSongalbum )

routeMusic.get('/singlevisible/:id', getController.getSingleVisible )

routeMusic.get('/singleMusic/:id', getController.single)
routeMusic.get('/allAlbum/:id', getController.detail)

routeMusic.get('/particularAlbum', middleware.authartist, getController.particularArtist)
routeMusic.get('/particularAlbum/:id', getController.particularArtistByUser)

routeMusic.patch('/add-song/:albumId/:musicId', middleware.authartist, getController.addSong )
routeMusic.delete('/deleteMusic/:albumId/:musicId', middleware.authartist, getController.deleteMusic )

routeMusic.patch('/update-song/:id', upload.single('image') , middleware.authartist, getController.updateSong)
routeMusic.delete('/thumbnaildelete-song/:id' , middleware.authartist, getController.deleteSongDetail)

routeMusic.patch('/update-album/:id', upload.single('image') , middleware.authartist, getController.updateAlbum)
routeMusic.delete('/albumpic-delete/:id' , middleware.authartist, getController.deleteAlbumPic)

module.exports=routeMusic