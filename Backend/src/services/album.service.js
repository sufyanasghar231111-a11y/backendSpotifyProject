const ImageKit=require('imagekit')

const imagekit=new ImageKit({
      publicKey:process.env.PUBLIC_KEY,
    privateKey:process.env.PRIVATE_KEY,
    urlEndpoint:process.env.URL_ENDPOINT
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