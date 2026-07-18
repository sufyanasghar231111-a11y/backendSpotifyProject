const express= require('express')
const middleWare = require('../middleware/middle')
const requestController = require("../controllers/userrequest.controller")
const requestRouter = express.Router()

requestRouter.post('/send-request', middleWare.getMusic, requestController.sendRequest )
requestRouter.get('/get-request', middleWare.adminMan, requestController.getRequest )
requestRouter.post('/patch-request/:id', middleWare.adminMan, requestController.updateRequest )
requestRouter.delete('/delete-request/:id', middleWare.adminMan, requestController.deleteRequest )
requestRouter.delete('/reject-request/:id', middleWare.adminMan, requestController.deleteRejected )

module.exports= requestRouter