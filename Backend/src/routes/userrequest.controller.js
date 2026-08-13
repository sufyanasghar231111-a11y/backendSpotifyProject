const express= require('express')
const middleWare = require('../middleware/middle')
const requestController = require("../controllers/userrequest.controller")
const requestRouter = express.Router()

requestRouter.post('/send-request', middleWare.getMusic, requestController.sendRequest )
requestRouter.get('/get-request', middleWare.adminMan, requestController.getRequest )
requestRouter.get('/get-single-request/:id', middleWare.adminMan, requestController.getSingleRequest )
requestRouter.get('/get-notification', middleWare.auth, requestController.getNotification )
requestRouter.post('/patch-request/:id', middleWare.adminMan, requestController.updateRequest )
requestRouter.post('/reject-request/:id', middleWare.adminMan, requestController.deleteRejected )
requestRouter.get('/update-request/:id', middleWare.authorize('admin', 'artist', 'user'), requestController.updateNotification )

module.exports= requestRouter