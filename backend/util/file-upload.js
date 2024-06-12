const multer = require('multer')
const fs = require("fs")
const { cloudinaryUpload } = require('./cloudinary');

//Handling file storages
const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        //First argument null, to deal with nodeJs error handling, second being folder saved into
        cb(null, 'uploads/images')
    },
    filename: (req, file, cb) => {
        const fileExtension = file.mimetype.split('/')[1];
        cb(null, `${Date.now()}-${file.fieldname}.${fileExtension}`);
    }
})

//File type
const fileType = (req, file, cb) => {
    if(file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') cb(null, true)
    else cb(null, false)
}

exports.upload = multer({storage: fileStorage, fileFilter: fileType})

exports.fileUpload = async(req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }
    const localFilePath = req.file.path;
    try {
        const response = await cloudinaryUpload(localFilePath)
        fs.unlinkSync(localFilePath)
        if(response){
            return res.status(200).json({ imageUrl: response.secure_url });
        }
        else {
            return res.status(500).json({ message: 'Cloudinary upload failed' });
        }
    }
    catch(err) {
        res.status(500).json({ message: 'Internal Server error' });
    }
}