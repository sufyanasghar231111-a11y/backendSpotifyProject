const express=require('express')
const routerRegister=require('../controllers/post.controller')
const routerLogin=require("../controllers/post.controller")
const middleware=require('../middleware/middle')
const router=express.Router()

router.post('/register',routerRegister.register)
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

module.exports=router