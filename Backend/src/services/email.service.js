const nodemailer=require('nodemailer')
const config=require('../config/config')

const transport=nodemailer.createTransport({
    service:'gmail',
    auth:{
        type:'OAuth2',
        user:process.env.EMAIL,
        clientId:process.env.GOOGLE_CLIENT_ID,
        clientSecret:process.env.GOOGLE_CLIENT_SECRET,
        refreshToken:process.env.GOOGLE_REFRESH_TOKEN
    }
})


transport.verify((error, success)=>{
    if(error){
        console.error(`Email is not ready to send ${error}`);
    }
    else{
        console.log("Email is ready to send");
        
    }
})


const sendEmail = (to, subject, text, html) => {
    const info=transport.sendMail({
        from:`Your Email is ${config.EMAIL}`,
        to,
        subject,
        text,
        html
    })

    console.log(`Message Send: ${info.messageId}`);
    console.log(`preview Url: ${nodemailer.getTestMessageUrl(info)}`);
}

module.exports=sendEmail
        