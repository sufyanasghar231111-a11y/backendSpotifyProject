const app = require('./src/app')
const connectDb = require('./src/db/db')
const { Server } = require('socket.io')
const {setIO} = require('./src/utils/socket')
const http = require('http')
const dns = require('dns')
dns.setDefaultResultOrder('ipv4first')

const PORT = process.env.PORT || 3000

// creating server with http 
const server =http.createServer(app)
 // creating io cors origins with FRONTEND_URL for deployment and two localhost for test
 // Socket.IO CORS → Socket connection
const io = new Server(server, {
    cors: {
        origin: [
            'http://localhost:5173',
            'http://localhost:3009',
            process.env.FRONTEND_URL
        ].filter(Boolean),
        credentials:true
    }
})



io.on('connection', (socket)=>{
    console.log(`Socket is connected`, socket.id);
    // user id come from frontend and join-user i same as frontend 
    socket.on('join-user', (userId)=>{
        socket.join(`user:${userId}`)
        console.log(`User ${userId} join room `);
    })

    socket.on('disconnect', ()=>{
        console.log(`Socket is disconnect`, socket.id);
    })
})
setIO(io)

const startServer = async () => {
    try {
        await connectDb()
        server.listen(PORT, '0.0.0.0', () => {
            console.log(`Server running on port ${PORT}`)
        })
    }
    catch (error) {
        console.error('Server startup failed:', error.message)
        process.exit(1)
    }
}
startServer()


