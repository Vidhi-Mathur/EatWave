require('dotenv').config()
const cloudinary = require('cloudinary').v2
const fs = require("fs")
          
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_SECRET_KEY
});

exports.cloudinaryUpload = async(localStoragePath) => {
    try {
        if(!localStoragePath) return null;
        const response = await cloudinary.uploader.upload(localStoragePath, {
            resource_type: "auto"
        });
        return response
    }
    catch(err) {
        //Remove temporary saved file as upload failed
        fs.unlinkSync(localStoragePath)
        return null
    }
}