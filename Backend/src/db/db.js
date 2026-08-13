const mongoose=require('mongoose');
const config = require('../config/config');

async function connectDb() {
    await mongoose.connect(config.MONGO_URI)
    console.log("DB connect Successful");
    
}

module.exports=connectDb