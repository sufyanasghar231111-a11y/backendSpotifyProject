const ImageKit=require('imagekit');
const config = require('../config/config');

const imageKit=new ImageKit({
    publicKey:config.PUBLIC_KEY,
    privateKey:config.PRIVATE_KEY,
    urlEndpoint:config.URL_ENDPOINT

})


async function uploadFile(file) {
    try{
        
        const result= await imageKit.upload({
            file:file,
            fileName:'my-music'+ Date.now() +'.mp3',
        })

        return result
    }
    catch(e){
        console.log(e);
        throw e 
    }
}

async function uploadThumbnail(image){
    try{
        const result=await imageKit.upload({
            file:image,
            fileName:'image.jpp'+Date.now()
        })

        return result
    }
    catch(e){
        console.log(e);
        throw e 
        
    }
}

module.exports={uploadFile, uploadThumbnail}