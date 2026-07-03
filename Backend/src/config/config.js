
const dotenv=require('dotenv')
dotenv.config()

if(!process.env.EMAIL){
    throw new Error('Email is not defined in env file')
}

if(!process.env.GOOGLE_CLIENT_ID){
    throw new Error('GOOGLE_CLIENT_ID is not defined in env file')
}

if(!process.env.GOOGLE_CLIENT_SECRET){
    throw new Error('GOOGLE_CLIENT_SECRET is not defined in env file')
}

if(!process.env.GOOGLE_REFRESH_TOKEN){
    throw new Error('GOOGLE_REFRESH_TOKEN is not defined in env file')
}

const config = {
    EMAIL:process.env.EMAIL,
    GOOGLE_CLIENT_ID:process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET:process.env.GOOGLE_CLIENT_SECRET,
    GOOGLE_REFRESH_TOKEN:process.env.GOOGLE_REFRESH_TOKEN
}

module.exports=config