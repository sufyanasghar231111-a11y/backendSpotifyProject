const express = require('express')
const middleware = require('../middleware/middle')
const controller=require('../controllers/active.controller')
const activeRouter = express.Router()

activeRouter.get('/monthly-active-users-chart',middleware.auth, middleware.adminMan,  controller.getMonthlyActiveUsersChart)
activeRouter.get('/get-all-role',middleware.auth, middleware.adminMan,  controller.getAllRole)


module.exports= activeRouter