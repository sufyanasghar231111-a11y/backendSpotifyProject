const app=require('./src/app')
const connectDb=require('./src/db/db')
const dns = require('dns')
dns.setDefaultResultOrder('ipv4first')

const PORT = process.env.PORT || 3000

const startServer =  async ()  => {
    try{
        await connectDb()
        app.listen(PORT, '0.0.0.0', ()=>{
             console.log(`Server running on port ${PORT}`)
        })
    }
    catch(error){
        console.error('Server startup failed:', error.message)
        process.exit(1)
    }
}
startServer()


