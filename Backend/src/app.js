require('dotenv').config()
const express = require('express')
const cookie = require('cookie-parser')
const router = require('../src/routes/post.route')
const routeMusic = require('../src/routes/music.route')
const userRouter = require('../src/routes/user.route')
const adminroute = require('../src/routes/admin.route')
const route = require('../src/routes/recent.route')
const routeRecent = require('../src/routes/recentsearch.route')
const currRouter = require('../src/routes/currentplaying.route')
const libRouter = require('../src/routes/library.route')
const getUserRoute = require('./routes/userget.route')
const resetRoute = require('./routes/resetpassword.route')
const rotationRoute = require('./routes/refreshRotation.route')
const otpRoute = require("./routes/otp.route")
const requestRouter = require('./routes/userrequest.controller')
const cors = require('cors');
const activeRouter = require('./routes/active.route')
const demoRouter = require('./routes/Demo.route')
const errorHanlder = require('./middleware/errorHandler')
const path = require('path')

const app = express()

// one error here during deployment time i did'nt add frontend URL mean railway domain also first frontendpath then cors and in the last splat like frontend path and then error handler 
const allowedOrigins = [
    'http://localhost:5173',
    'http://localhost:3009',
    process.env.FRONTEND_URL
].filter(Boolean)
console.log('✅ Allowed Origins:', allowedOrigins)


const frontendpath = path.join(__dirname, '../public')

console.log('📁 Frontend path:', frontendpath)


// Serve React build files
app.use(express.static(frontendpath))


app.use(cors({
    origin: (origin, callback) => {
        if (!origin) {
            return callback(null, true)
        }
        if (allowedOrigins.includes(origin)) {
            return callback(null, true)
        }

        console.log('❌ CORS blocked origin:', origin)
        console.log('✅ Allowed origins:', allowedOrigins)

        callback(new Error('Not allowed by cors'))
    },
    credentials: true
}))

app.use(express.json())

app.get('/health', (req, res) => {
    res.status(200).json({
        message: 'Ok'
    })
})


app.use(cookie())
app.use('/api/auth', router)
app.use('/api/creator', routeMusic)

app.use('/api/user', userRouter.router)

app.use('/api/admin', adminroute)

app.use('/api/moreuser', route)

app.use('/api/search', routeRecent)
app.use('/api/current', currRouter)

app.use('/api/library', libRouter)

app.use('/api/userdata', getUserRoute)

app.use('/api/reset', resetRoute)

// refreshToken route how generate automatically access token evry request and after 10m

app.use('/api/rotation', rotationRoute)

app.use('/api/otp', otpRoute)

// User request from admin for artist 
app.use('/api/request', requestRouter)


app.use('/api/active', activeRouter)

app.use('/api/demo', demoRouter)





app.get('/{*splat}', (req, res) => {

    res.sendFile(
        path.join(frontendpath, 'index.html'),
        (err) => {

            if (err) {
                console.error('❌ Failed to send index.html:', err)

                res.status(500).json({
                    message: 'Frontend could not be loaded'
                })
            }
        }
    )
})

app.use(errorHanlder)

module.exports = app