const ImageKit=require('imagekit');
const config = require('../config/config');

const imagekit=new ImageKit({
      publicKey:config.PUBLIC_KEY,
    privateKey:config.PRIVATE_KEY,
    urlEndpoint:config.URL_ENDPOINT
})


async  function uploadalbumPic(buffer){
    try{
        const result= await imagekit.upload({
            file:buffer,
            fileName:'album-pic'
        })

        return result
    }
    catch(err){
        console.log(err);
        throw(err)
    }
}

module.exports=uploadalbumPic