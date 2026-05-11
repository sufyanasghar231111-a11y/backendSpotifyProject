const ImageKit=require('@imagekit/nodejs')

const imageKit=new ImageKit({
    privateKey:process.env.PRIVATE_KEY
})

async function uploadFile(file) {
    try{
        const result= await imageKit.files.upload({
            file:file,
            fileName:'my-music'+ Date.now() +'.mp3',
        })

        return result
    }
    catch(e){
        console.log(e);
    }
}

module.exports=uploadFile