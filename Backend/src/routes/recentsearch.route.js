const express=require('express')

const searchcontroller=require('../controllers/recentsearch.controller')
const routeRecent=express.Router()
const middleware=require("../middleware/middle")

routeRecent.post('/createSearch', middleware.getMusic,searchcontroller.createRecentSearch)
routeRecent.get('/getSearch', middleware.getMusic,searchcontroller.getRecentSearch)
routeRecent.patch('/songSearch/:id', middleware.getMusic,searchcontroller.patchRecentSearch)
routeRecent.patch('/albumSearch/:id', middleware.getMusic,searchcontroller.patchRecentAlbum)
routeRecent.delete('/deleteSearch/:id', middleware.getMusic,searchcontroller.deleteRecentSearch)

routeRecent.patch('/recenttext', middleware.getMusic,searchcontroller.patchText)

module.exports=routeRecent