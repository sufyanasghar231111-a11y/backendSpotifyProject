const express = require('express')

const middleware=require('../middleware/middle')
const libraryController=require('../controllers/library.controller')
const libRouter=express.Router()


libRouter.post('/createLibrary', middleware.getMusic, libraryController.createLibrary )
libRouter.get('/getLibrary',middleware.getMusic, libraryController.getLibrary )
libRouter.patch('/addTolab/:musicId', middleware.getMusic, libraryController.addTolab )
libRouter.delete('/deleteLab/:musicId', middleware.getMusic, libraryController.deleteLab )


module.exports=libRouter
