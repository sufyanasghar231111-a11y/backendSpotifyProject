const ImageKit=require('imagekit')

const imageKit=new ImageKit({
    publicKey:process.env.PUBLIC_KEY,
    privateKey:process.env.PRIVATE_KEY,
    urlEndpoint:process.env.URL_ENDPOINT

})

console.log(typeof imageKit.upload)

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