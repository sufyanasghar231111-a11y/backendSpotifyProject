const express=require('express')
const routerRegister=require('../controllers/post.controller')
const routerLogin=require("../controllers/post.controller")

const router=express.Router()

router.post('/register',routerRegister.register)
router.post('/login', routerLogin.login)

module.exports=router