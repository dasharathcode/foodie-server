import mongoose from 'mongoose'

const bannerSchema = new mongoose.Schema({
  imageUrl: String,
  publicId: String,
  title: String,
  description: String
}, { timestamps: true })

export default mongoose.model('Banner', bannerSchema)
