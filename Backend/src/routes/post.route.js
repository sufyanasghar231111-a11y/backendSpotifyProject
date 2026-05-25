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
router.post('/logout', (req,res)=>{
    res.clearCookie('token',{
        httpOnly:true,
        sameSite:'lax',
        secure:false
    })
    res.status(201).json({
        message:"successful logout"
    })
})

router.put('/updatepfp',upload.single('pfp') ,middleware.getMusic, routerLogin.updatePfp )
router.delete('/removePfp', upload.single('pfp') , middleware.getMusic, routerLogin.removePfp )

module.exports=router