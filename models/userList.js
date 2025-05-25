import express from 'express';
import userModel from '../models/userModel.js';

const router = express.Router();

// Get all users with pagination and search
router.get('/', async (req, res) => {
  try {
    const search = req.query.search || '';
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const skip = (page - 1) * limit;

    const users = await userModel.find({
      email: { $regex: search, $options: 'i' }
    }).skip(skip).limit(limit);

    const total = await userModel.countDocuments({
      email: { $regex: search, $options: 'i' }
    });

    res.json({ users, total });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch users' });
  }
});

// Delete user
router.delete('/:id', async (req, res) => {
  try {
    await userModel.findByIdAndDelete(req.params.id);
    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Delete failed' });
  }
});

// Update user
router.put('/:id', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const updatedUser = await userModel.findByIdAndUpdate(
      req.params.id,
      { name, email, password },
      { new: true }
    );
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: 'Update failed' });
  }
});

export default router;
