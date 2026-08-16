const mongoose = require('mongoose');
const config = require('../config/config');

async function connectDb() {
    
    if (!config.MONGO_URI) {
        throw new Error('MONGO_URI is not defined');
    }

    try {
        await mongoose.connect(config.MONGO_URI, {
            family: 4,
            serverSelectionTimeoutMS: 30000,
            connectTimeoutMS: 30000,
            socketTimeoutMS: 45000,
            retryWrites: true,
            maxPoolSize: 10,
            minPoolSize: 1,
            tls: true,
            tlsAllowInvalidCertificates: false,
            tlsAllowInvalidHostnames: false,
        });

        console.log('DB connect Successful');
    } catch (error) {
        
        console.error(error.message);
        throw error;
    }
}

module.exports = connectDb;