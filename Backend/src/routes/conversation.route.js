const express = require('express')
const middle = require('../middleware/middle')
const controller = require('../controllers/conversation.controller')
const conversationRoute = express.Router()

conversationRoute.post('/', middle.authorize('user', 'admin', 'artist'), controller.getOrCreateConversation)

module.exports = conversationRoute