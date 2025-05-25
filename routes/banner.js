import express from 'express';
import multer from 'multer';
import cloudinary from '../utils/cloudinary.js';
import Banner from '../models/Banner.js';
import fs from 'fs';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

// Get current banner
router.get('/', async (req, res) => {
  const banner = await Banner.findOne();
  res.json(banner || {});
});

// Update banner
router.post('/update', upload.single('image'), async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'hero_banners'
    });

    const oldBanner = await Banner.findOne();

    if (oldBanner) {
      // Delete old image from cloudinary
      await cloudinary.uploader.destroy(oldBanner.publicId);
      await Banner.findByIdAndDelete(oldBanner._id);
    }

    const newBanner = new Banner({
      imageUrl: result.secure_url,
      publicId: result.public_id
    });

    await newBanner.save();

    fs.unlinkSync(req.file.path); // Delete local temp file
    res.json({ message: 'Banner updated successfully', imageUrl: result.secure_url });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Banner update failed' });
  }
});

export default router;
