const express=require('express')

const router=express.Router()
const userController=require('../controllers/user.controller')
const middleware=require('../middleware/middle')

router.post('/playlist', middleware.getMusic , userController.playlist)
router.get('/particularUserPlaylist', middleware.getMusic, userController.particularUserPlaylist)
router.get('/separate/:id', middleware.getMusic, userController.separate)
router.patch('/visible/:id', middleware.getMusic, userController.visibilityPlaylist)
router.get('/singleparticularvisible/:id', userController.getParticulatVisible)

router.delete('/deletePlaylist/:id', middleware.getMusic, userController.deletePlaylistComplete)


router.delete('/deleteMusic/:particularId/:musicId', middleware.getMusic,userController.deleteMusic )
router.patch('/updateMusic/:particularId/:musicId', middleware.getMusic,userController.pushMusic )
router.get('/getMusic/:particularId/:musicId', middleware.getMusic,userController.getSingleMusic )

router.post('/particularUserFavorite', middleware.getMusic,userController.particularFav )

router.get('/getUserFavorite',middleware.getMusic,userController.getUserFav )

router.patch('/fav/:favoriteId', middleware.getMusic,userController.favoriteMusic )
router.delete('/deleteFav/:favoriteId',middleware.getMusic, userController.deleteFavMusic )
router.get('/singleFavMusic/:favId/:favoriteId', middleware.getMusic, userController.singleFav)



module.exports={router}