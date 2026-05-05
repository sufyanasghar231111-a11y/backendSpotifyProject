const ImageKit=require('@imagekit/nodejs')

const imageKit=new ImageKit({
    privateKey:process.env.PRIVATE_KEY
})

async function uploadFile(file) {
    try{
        const result= await imageKit.files.upload({
            file:file.buffer.toString('base64'),
            fileName:'my-music'+ Date.now()
        })

        return result
    }
    catch(e){
        console.log(e);
    }
}

module.exports=uploadFile