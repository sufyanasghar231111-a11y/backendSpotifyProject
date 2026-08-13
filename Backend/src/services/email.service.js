const nodemailer=require('nodemailer');
const config = require('../config/config');

const transport=nodemailer.createTransport({
    service:'gmail',
    auth:{
        type:'OAuth2',
        user:config.EMAIL,
        clientId:config.GOOGLE_CLIENT_ID,
        clientSecret:config.GOOGLE_CLIENT_SECRET,
        refreshToken:config.GOOGLE_REFRESH_TOKEN
    }
})


transport.verify((error, success)=>{
    if(error){
        console.error(`Email is not ready to send ${error}`);
    }
    else{
        console.log(` Email is ready to send ${success}` );
        
    }
})


const sendEmail = (to, subject, text, html) => {
    const info=transport.sendMail({
        from:`Your Email is ${process.env.EMAIL}`,
        to,
        subject,
        text,
        html
    })

    console.log(`Message Send: ${info.messageId}`);
    console.log(`preview Url: ${nodemailer.getTestMessageUrl(info)}`);
}

module.exports=sendEmail
        