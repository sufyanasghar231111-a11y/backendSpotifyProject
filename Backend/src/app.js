require('dotenv').config()
const express= require('express')
const cookie=require('cookie-parser')
const router=require('../src/routes/post.route')
const routeMusic=require('../src/routes/music.route')
const userRouter=require('../src/routes/user.route')
const adminroute=require('../src/routes/admin.route')
const cors = require('cors');


const app= express()
app.use(cors())
app.use(express.json())

app.use(cookie())
app.use('/api/auth', router)

app.use('/api/creator',routeMusic) 

app.use('/api/user',userRouter.router )

app.use('/api/admin', adminroute)

module.exports=app