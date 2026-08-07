const express=require('express')
const routerRegister=require('../controllers/post.controller')
const routerLogin=require("../controllers/post.controller")
const middleware=require('../middleware/middle')
const router=express.Router()
let multer=require('multer')
const upload=multer({storage:multer.memoryStorage()})

router.post('/register',upload.single('pfp'),routerRegister.register)
router.post('/login', routerLogin.login)
router.get('/user', middleware.auth,  routerLogin.getUser)
router.put('/updatepfp',upload.single('pfp') ,middleware.authorize('user', 'artist'), routerLogin.updatePfp )
router.patch('/updateadminpfp',upload.single('pfp') ,middleware.authorize('admin'), routerLogin.updateAdminPfp )
router.delete('/removePfp', upload.single('pfp') , middleware.authorize('user', 'artist', 'admin'), routerLogin.removePfp )

module.exports=router