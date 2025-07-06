const cloudinary = require('../config/cloudinary');

// Middleware to upload image to Cloudinary
const cloudinaryUpload = async (req, res, next) => {
  if (!req.file) return res.status(400).json({ message: 'Proof image is required' });

  try {
    const result = await cloudinary.uploader.upload_stream(
      { folder: 'donations' },
      (error, result) => {
        if (error) return next(error);
        req.cloudinaryUrl = result.secure_url;
        next();
      }
    );
    // Pipe the file buffer to Cloudinary
    req.file.stream.pipe(result);
  } catch (err) {
    return res.status(500).json({ message: 'Cloudinary upload failed', error: err.message });
  }
};

module.exports = cloudinaryUpload;
