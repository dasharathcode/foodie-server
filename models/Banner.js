import mongoose from 'mongoose';

const bannerSchema = new mongoose.Schema({
  imageUrl: String,
  publicId: String
});

export default mongoose.model('Banner', bannerSchema);
