
const dotenv=require('dotenv')
dotenv.config()

if(!process.env.EMAIL){
    throw new Error('Email is not defined in env file')
}

const hasAppPassword = Boolean(process.env.EMAIL_PASS)
const hasOAuth2 = Boolean(
    process.env.GOOGLE_CLIENT_ID &&
    process.env.GOOGLE_CLIENT_SECRET &&
    process.env.GOOGLE_REFRESH_TOKEN
)

if(!hasAppPassword && !hasOAuth2){
    throw new Error('Set EMAIL_PASS for Gmail app-password auth, or configure GOOGLE_CLIENT_ID/GOOGLE_CLIENT_SECRET/GOOGLE_REFRESH_TOKEN for OAuth2.')
}

if(!process.env.MONGO_URI){
    throw new Error('MONGO_URI is not defined in env file')
}

if(!process.env.FRONTEND_URL){
    throw new Error('FRONTEND_URL is not defined in env file')
}

if(!process.env.PUBLIC_KEY){
    throw new Error('PUBLIC_KEY is not defined in env file')
}

if(!process.env.PRIVATE_KEY){
    throw new Error('PRIVATE_KEY is not defined in env file')
}

if(!process.env.URL_ENDPOINT){
    throw new Error('URL_ENDPOINT is not defined in env file')
}

if(!process.env.ACCESS_TOKEN){
    throw new Error('ACCESS_TOKEN is not defined in env file')
}

if(!process.env.SECRET_JWT){
    throw new Error('SECRET_JWT is not defined in env file')
}

const config = {
    EMAIL:process.env.EMAIL,
    EMAIL_PASS:process.env.EMAIL_PASS,
    GOOGLE_CLIENT_ID:process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET:process.env.GOOGLE_CLIENT_SECRET,
    GOOGLE_REFRESH_TOKEN:process.env.GOOGLE_REFRESH_TOKEN,
    MONGO_URI:process.env.MONGO_URI,
    FRONTEND_URL:process.env.FRONTEND_URL,
    PUBLIC_KEY:process.env.PUBLIC_KEY,
    PRIVATE_KEY:process.env.PRIVATE_KEY,
    URL_ENDPOINT:process.env.URL_ENDPOINT,
    ACCESS_TOKEN:process.env.ACCESS_TOKEN,
    SECRET_JWT:process.env.SECRET_JWT,
}

module.exports=config