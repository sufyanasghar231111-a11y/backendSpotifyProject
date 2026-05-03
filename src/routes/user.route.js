const express=require('express')

const router=express.Router()
const userController=require('../controllers/user.controller')
const middleware=require('../middleware/middle')

router.post('/playlist', middleware.getMusic , userController.playlist)
router.get('/particularUserPlaylist', middleware.getMusic, userController.particularUserPlaylist)

router.delete('/deleteMusic/:particularId/:musicId', middleware.getMusic,userController.deleteMusic )
router.patch('/updateMusic/:particularId/:musicId', middleware.getMusic,userController.pushMusic )
router.get('/getMusic/:particularId/:musicId', middleware.getMusic,userController.getSingleMusic )

router.post('/particularUserFavorite', middleware.getMusic,userController.particularFav )

router.get('/getUserFavorite',middleware.getMusic,userController.getUserFav )

router.patch('/fav/:favId/:favoriteId', middleware.getMusic,userController.favoriteMusic )
router.delete('/deleteFav/:favId/:favoriteId',middleware.getMusic, userController.deleteFavMusic )
router.get('/singleFavMusic/:favId/:favoriteId', middleware.getMusic, userController.singleFav)


module.exports={router}