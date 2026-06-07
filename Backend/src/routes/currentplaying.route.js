const express=require('express')

const current=require('../controllers/currentplaying.controller')
const currRouter=express.Router()
const middleware=require('../middleware/middle')

currRouter.post('/createcurr',middleware.getMusic, current.createCurr)
currRouter.get('/getcurr',middleware.getMusic, current.getCurr)
currRouter.patch('/patchcurr/:id',middleware.getMusic, current.patchCurr)

module.exports=currRouter