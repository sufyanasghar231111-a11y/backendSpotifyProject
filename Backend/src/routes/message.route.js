const express = require('express')
const middleware = require('../middleware/middle')
const controller = require('../controllers/message.controller')
const asyncHandler = require('../utils/asyncHandler')
const messageRoute = express.Router()

messageRoute.post('/create-message/:conversationId', middleware.authorize('user', 'admin', 'artist'), asyncHandler(controller.sendMessage))

module.exports = messageRoute