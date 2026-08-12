const express=require('express')

const router=express.Router()
const userController=require('../controllers/user.controller')
const multer = require('multer')
const upload = multer({storage: multer.memoryStorage()})
const middleware=require('../middleware/middle')

router.post('/playlist', middleware.authorize('user', 'artist') , userController.playlist)
router.get('/particularUserPlaylist', middleware.authorize('user', 'artist', 'admin'), userController.particularUserPlaylist)
router.get('/separate/:id', middleware.authorize('user', 'artist') , userController.separate)
router.patch('/visible/:id', middleware.authorize('user', 'artist'), userController.visibilityPlaylist)
router.patch('/updatePlaylistData/:id', upload.single('pfp') , middleware.authorize('user', 'artist'), userController.updateName)
router.delete('/deletePlaylistData/:id', middleware.authorize('user', 'artist'), userController.deleteData)
router.get('/singleparticularvisible/:id', userController.getParticulatVisible)

router.delete('/deletePlaylist/:id', middleware.authorize('user', 'artist'), userController.deletePlaylistComplete)


router.delete('/deleteMusic/:particularId/:musicId', middleware.authorize('user', 'artist'),userController.deleteMusic )
router.patch('/updateMusic/:particularId/:musicId', middleware.authorize('user', 'artist'),userController.pushMusic )
router.get('/getMusic/:particularId/:musicId', middleware.authorize('user', 'artist'),userController.getSingleMusic )

router.post('/particularUserFavorite', middleware.authorize('user', 'artist'),userController.particularFav )

router.get('/getUserFavorite',middleware.authorize('user', 'artist'),userController.getUserFav )

router.patch('/fav/:type/:favoriteId', middleware.authorize('user', 'artist'),userController.favoriteMusic )
router.delete('/deleteFav/:favoriteId',middleware.authorize('user', 'artist'), userController.deleteFavMusic )
router.get('/singleFavMusic/:favId/:favoriteId', middleware.authorize('user', 'artist'), userController.singleFav)



module.exports={router}