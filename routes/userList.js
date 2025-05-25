import express from 'express';
import userModel from '../models/userModel.js';

const router = express.Router();

router.get('/all', async (req, res) => {
    try {
        const users = await userModel.find({});
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch users', error: err });
    }
});

export default router;
