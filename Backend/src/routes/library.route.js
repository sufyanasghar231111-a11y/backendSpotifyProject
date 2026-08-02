const express = require('express')

const middleware=require('../middleware/middle')
const libraryController=require('../controllers/library.controller')
const libRouter=express.Router()


libRouter.post('/createLibrary', middleware.authorize('user', 'artist'), libraryController.createLibrary )
libRouter.get('/getLibrary',middleware.authorize('user', 'artist'), libraryController.getLibrary )
libRouter.patch('/addTolab/:musicId', middleware.authorize('user', 'artist'), libraryController.addTolab )
libRouter.delete('/deleteLab/:musicId', middleware.authorize('user', 'artist'), libraryController.deleteLab )

module.exports=libRouter
