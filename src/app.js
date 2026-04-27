require('dotenv').config()
const express= require('express')
const cookie=require('cookie-parser')
const router=require('../src/routes/post.route')
const routeMusic=require('../src/routes/music.route')


const app= express()
app.use(express.json())

app.use(cookie())
app.use('/api/auth', router)

app.use('/api/creator',routeMusic) 

module.exports=app