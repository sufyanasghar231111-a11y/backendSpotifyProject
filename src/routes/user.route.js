const express=require('express')

const router=express.Router()
const userController=require('../controllers/user.controller')
const middleware=require('../middleware/middle')

router.post('/playlist', middleware.getMusic , userController.playlist)
router.get('/particularUserPlaylist', middleware.getMusic, userController.particularUserPlaylist)

router.delete('/deleteMusic/:particularId/:musicId', middleware.getMusic,userController.deleteMusic )

module.exports={router}