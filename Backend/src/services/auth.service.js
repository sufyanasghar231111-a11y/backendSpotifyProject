const ImageKit=require('imagekit')

const imagekit=new ImageKit({
    publicKey:process.env.PUBLIC_KEY,
    privateKey:process.env.PRIVATE_KEY,
    urlEndpoint:process.env.URL_ENDPOINT
})

async function uploadPfp(buffer){
    try{
        

        const result=await imagekit.files.upload({
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
