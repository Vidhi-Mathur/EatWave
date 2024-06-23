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

exports.fileUpload = async (req, res) => {
    if (!req.files || req.files.length === 0) {
        return res.status(400).json({ message: 'No files uploaded' });
    }
    const folder = req.body.folder || 'default-folder'; 
    const uploadPromises = req.files.map(file => cloudinaryUpload(file.path, folder));
    try {
        const uploadResults = await Promise.all(uploadPromises);
        const imageUrls = uploadResults.map(result => result.secure_url);
        req.files.forEach(file => {
            if(fs.existsSync(file.path)) fs.unlinkSync(file.path);
        });
        return res.status(200).json({ imageUrls });
    } 
    catch (err) {
        req.files.forEach(file => {
            if(fs.existsSync(file.path)) fs.unlinkSync(file.path);
        });
        return res.status(500).json({ message: 'Failed to upload files' });
    }
};
