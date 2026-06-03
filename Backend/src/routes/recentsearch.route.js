const express=require('express')

const searchcontroller=require('../controllers/recentsearch.controller')
const routeRecent=express.Router()
const middleware=require("../middleware/middle")

routeRecent.post('/createSearch', middleware.getMusic,searchcontroller.createRecentSearch)
routeRecent.get('/getSearch', middleware.getMusic,searchcontroller.getRecentSearch)
routeRecent.patch('/patchSearch/:id', middleware.getMusic,searchcontroller.patchRecentSearch)

module.exports=routeRecent