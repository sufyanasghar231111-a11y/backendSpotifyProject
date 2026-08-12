const  express=require('express')

const searchcontroller=require('../controllers/recentsearch.controller')
const routeRecent=express.Router()
const middleware=require("../middleware/middle")

routeRecent.post('/createSearch', middleware.authorize('user', 'artist', 'admin'),searchcontroller.createRecentSearch)
routeRecent.get('/getSearch', middleware.authorize('user', 'artist', 'admin'),searchcontroller.getRecentSearch)
routeRecent.patch('/songSearch/:id', middleware.authorize('user', 'artist', 'admin'),searchcontroller.patchRecentSearch)
routeRecent.patch('/albumSearch/:id', middleware.authorize('user', 'artist', 'admin'),searchcontroller.patchRecentAlbum)
routeRecent.patch('/playlistSearch/:id', middleware.authorize('user', 'artist', 'admin'),searchcontroller.patchRecentPlaylist)
routeRecent.delete('/deleteSearch/:id', middleware.authorize('user', 'artist', 'admin'),searchcontroller.deleteRecentSearch)

routeRecent.patch('/recenttext', middleware.authorize('user', 'artist','admin'),searchcontroller.patchText)

module.exports=routeRecent