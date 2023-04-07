const cloudinary = require("cloudinary").v2;
const UploadImageandGetUrl = async (image, id) => {
  // Configuration
  cloudinary.config({
    cloud_name: "djlmmcnyh",
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_SECRET_KEY,
  });
  try {
    // Upload
    const res = await cloudinary.uploader.upload(image, {
      public_id: `${Date.now()}`,
      resource_type: "auto",
    });

    return res.secure_url;
  } catch (error) {
    console.log(error);
  }
};
module.exports = UploadImageandGetUrl;
