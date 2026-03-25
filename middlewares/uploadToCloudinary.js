const streamifier = require('streamifier');
const cloudinary = require('../config/cloudinary');

module.exports = function uploadToCloudinary(buffer, folder) {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            { folder },
            (error, result) => {
                if (error) reject(error);
                else resolve(result);
            }
    );
    streamifier.createReadStream(buffer).pipe(stream)
    })
};
