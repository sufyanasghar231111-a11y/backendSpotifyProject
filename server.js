const app=require('./src/app')
const connectDb=require('./src/db/db')
connectDb()

app.listen(3000, ()=>{
    console.log("Port no 3000 is running ");
})