const ImageKit= require('imagekit')
const config = require('../config/config')

const imagekit= new ImageKit({
    publicKey:config.PUBLIC_KEY,
    privateKey:config.PRIVATE_KEY,
    urlEndpoint:config.URL_ENDPOINT
})

const uploadPfp = async (buffer) =>{
    const result = await imagekit.upload({
        fileName:'playlist-pic',
        file:buffer
    })

    return result
}

module.exports=uploadPfp