// import express from 'express';
// import multer from 'multer';
// import cloudinary from '../utils/cloudinary.js';
// import Banner from '../models/Banner.js';
// import fs from 'fs';

// const router = express.Router();
// const upload = multer({ dest: 'uploads/' });

// // Get current banner
// router.get('/', async (req, res) => {
//   const banner = await Banner.findOne();
//   res.json(banner || {});
// });

// // Update banner
// router.post('/update', upload.single('image'), async (req, res) => {
//   try {
//     const result = await cloudinary.uploader.upload(req.file.path, {
//       folder: 'hero_banners'
//     });

//     const oldBanner = await Banner.findOne();

//     if (oldBanner) {
//       // Delete old image from cloudinary
//       await cloudinary.uploader.destroy(oldBanner.publicId);
//       await Banner.findByIdAndDelete(oldBanner._id);
//     }

//     const newBanner = new Banner({
//       imageUrl: result.secure_url,
//       publicId: result.public_id
//     });

//     await newBanner.save();

//     fs.unlinkSync(req.file.path); // Delete local temp file
//     res.json({ message: 'Banner updated successfully', imageUrl: result.secure_url });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Banner update failed' });
//   }
// });

// export default router;



// import express from 'express'
// import multer from 'multer'
// import cloudinary from '../utils/cloudinary.js'
// import Banner from '../models/Banner.js'
// import fs from 'fs'

// const router = express.Router()
// const upload = multer({ dest: 'uploads/' })

// // GET all banners
// router.get('/', async (req, res) => {
//   try {
//     const banners = await Banner.find().sort({ createdAt: -1 }) // latest first
//     res.json(banners)
//   } catch (err) {
//     console.error(err)
//     res.status(500).json({ message: 'Failed to fetch banners' })
//   }
// })

// // POST new banner with image + text
// router.post('/add', upload.single('image'), async (req, res) => {
//   try {
//     const result = await cloudinary.uploader.upload(req.file.path, {
//       folder: 'hero_banners'
//     })

//     const { title, description } = req.body

//     const newBanner = new Banner({
//       imageUrl: result.secure_url,
//       publicId: result.public_id,
//       title,
//       description
//     })

//     await newBanner.save()
//     fs.unlinkSync(req.file.path)

//     res.json({ message: 'Banner added successfully', banner: newBanner })
//   } catch (err) {
//     console.error(err)
//     res.status(500).json({ message: 'Failed to add banner' })
//   }
// })

// // DELETE a banner
// router.delete('/:id', async (req, res) => {
//   try {
//     const banner = await Banner.findById(req.params.id)
//     if (!banner) return res.status(404).json({ message: 'Banner not found' })

//     await cloudinary.uploader.destroy(banner.publicId)
//     await Banner.findByIdAndDelete(req.params.id)

//     res.json({ message: 'Banner deleted successfully' })
//   } catch (err) {
//     console.error(err)
//     res.status(500).json({ message: 'Failed to delete banner' })
//   }
// })

// export default router



import express from 'express'
import multer from 'multer'
import cloudinary from '../utils/cloudinary.js'
import Banner from '../models/Banner.js'
import fs from 'fs'

const router = express.Router()
const upload = multer({ dest: 'uploads/' })

// GET all banners
router.get('/', async (req, res) => {
  try {
    const banners = await Banner.find().sort({ createdAt: -1 }) // latest first
    res.json(banners)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Failed to fetch banners' })
  }
})

// POST new banner with image + text
router.post('/add', upload.single('image'), async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'hero_banners'
    })

    const { title, description } = req.body

    const newBanner = new Banner({
      imageUrl: result.secure_url,
      publicId: result.public_id,
      title,
      description
    })

    await newBanner.save()
    fs.unlinkSync(req.file.path)

    res.json({ message: 'Banner added successfully', banner: newBanner })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Failed to add banner' })
  }
})

// DELETE a banner
router.delete('/:id', async (req, res) => {
  try {
    const banner = await Banner.findById(req.params.id)
    if (!banner) return res.status(404).json({ message: 'Banner not found' })

    await cloudinary.uploader.destroy(banner.publicId)
    await Banner.findByIdAndDelete(req.params.id)

    res.json({ message: 'Banner deleted successfully' })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Failed to delete banner' })
  }
})

export default router
