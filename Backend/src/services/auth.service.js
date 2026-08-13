const ImageKit=require('imagekit');
const config = require('../config/config');

const imagekit=new ImageKit({
    publicKey:config.PUBLIC_KEY,
    privateKey:config.PRIVATE_KEY,
    urlEndpoint:config.URL_ENDPOINT
})

async function uploadPfp(buffer){
    try{
         const result=await imagekit.upload({
            file:buffer,
            fileName:'UserImage'+Date.now()
        })
        return result
    }
    catch(e){
        console.log(e);
        throw(e)
        
    }
}

module.exports=uploadPfp
