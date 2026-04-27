const express=require('express')
const multer= require('multer')
const routeMusic=express()
const upload= multer({storage: multer.memoryStorage()})
const controlMusic=require('../controllers/music.controller')
const controlAlbum=require('../controllers/music.controller')
const middleware=require('../middleware/middle')


routeMusic.post('/music', middleware.authartist ,  upload.single('file'), controlMusic.music)
routeMusic.post('/album', middleware.authartist ,  controlAlbum.album )

module.exports=routeMusic