const express=require('express')

const current=require('../controllers/currentplaying.controller')
const currRouter=express.Router()
const middleware=require('../middleware/middle')

currRouter.post('/createcurr',middleware.authorize('user', 'artist'), current.createCurr)
currRouter.get('/getcurr',middleware.authorize('user', 'artist'), current.getCurr)
currRouter.patch('/patchcurr/:id',middleware.authorize('user', 'artist'), current.patchCurr)

module.exports=currRouter