const express = require('express')
const controller = require('../controllers/Demo.controller')
const demoRouter = express.Router()

demoRouter.get('/demo-playlist-album-song', controller.demoApi )


module.exports = demoRouter