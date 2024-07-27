require('dotenv').config()
const cloudinary = require('cloudinary').v2
const fs = require("fs")
          
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_SECRET_KEY
});

exports.cloudinaryUpload = async(localStoragePath, folder) => {
    try {
        if(!localStoragePath) return null;
        const response = await cloudinary.uploader.upload(localStoragePath, {
            resource_type: "auto",
            folder
        });
        return response
    }
    catch(err) {
        //Remove temporary saved file as upload failed
        fs.unlinkSync(localStoragePath)
        return null
    }
}

exports.cloudinaryDelete = async(req, res) => {
    const { public_id, folder } = req.body
    if(!public_id) return res.status(400).json({ message: 'public_id is missing'})
    try {
        await cloudinary.uploader.destroy(`${folder}/${public_id}`)
        return res.status(200).json({ message: 'Image deleted successfully'})
    }
    catch(err) {
        return null
    }
}