// const cloudinary = require("cloudinary").v2;

// const uploadFileToCloudinary = async(file)=>{
//     cloudinary.config({
//         cloud_name:"dsfwfk77f",
//         api_key:"584191827645691",
//         api_secret:"ehNNCXtSs0CCAzuCbw5XG-ptqsI"
//     })

//     const cloudinaryResponse = await cloudinary.uploader.upload(file.path)
//     return cloudinaryResponse
// }

// module.exports = {
//     uploadFileToCloudinary
// }

const cloudinary = require("cloudinary").v2;
const fs = require('fs');

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "dsfwfk77f",
  api_key: process.env.CLOUDINARY_API_KEY || "584191827645691",
  api_secret: process.env.CLOUDINARY_API_SECRET || "ehNNCXtSs0CCAzuCbw5XG-ptqsI"
});

const uploadFileToCloudinary = async (filePath) => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: 'doctor-profiles',
      width: 500,
      height: 500,
      crop: 'fill',
      quality: 'auto',
      format: 'jpg'
    });
    
    // Delete the temporary file after upload
    fs.unlinkSync(filePath);
    
    return result;
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    throw error;
  }
};

const deleteFileFromCloudinary = async (publicId) => {
  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.error('Cloudinary delete error:', error);
    throw error;
  }
};

module.exports = {
  uploadFileToCloudinary,
  deleteFileFromCloudinary
};