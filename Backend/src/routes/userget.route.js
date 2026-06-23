const express=require('express')
const userget=require('../controllers/userget.controller')
const getUserRoute=express.Router()
const middleware=require('../middleware/middle')

getUserRoute.get('/getalluser',  userget.getAllUser )
getUserRoute.get('/singleUser/:id', userget.getSingle)


module.exports=getUserRoute