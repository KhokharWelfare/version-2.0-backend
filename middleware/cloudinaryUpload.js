const cloudinary = require('../config/cloudinary');
const streamifier = require('streamifier');

// Middleware to upload image to Cloudinary
const cloudinaryUpload = (req, res, next) => {
  if (!req.file) return res.status(400).json({ message: 'Proof image is required' });

  const stream = cloudinary.uploader.upload_stream(
    { folder: 'donations' },
    (error, result) => {
      if (error) return next(error);
      req.cloudinaryUrl = result.secure_url;
      next();
    }
  );
  streamifier.createReadStream(req.file.buffer).pipe(stream);
};

module.exports = cloudinaryUpload;
