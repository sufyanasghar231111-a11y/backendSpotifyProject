const ImageKit= require('imagekit')

const imagekit= new ImageKit({
    publicKey:process.env.PUBLIC_KEY,
    privateKey:process.env.PRIVATE_KEY,
    urlEndpoint:process.env.URL_ENDPOINT
})

const uploadPfp = async (buffer) =>{
    const result = await imagekit.upload({
        fileName:'playlist-pic',
        file:buffer
    })

    return result
}

module.exports=uploadPfp