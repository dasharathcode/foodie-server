import express from 'express';
import userModel from '../models/userModel.js';      // ✅ correct import
import orderModel from '../models/orderModel.js';    // ✅ correct import

const router = express.Router();

router.get('/stats', async (req, res) => {
    try {
        // Total user count
        const totalUsers = await userModel.countDocuments();

        // Total order count
        const totalOrders = await orderModel.countDocuments();

        // Get only delivered orders
        const deliveredOrders = await orderModel.find({ status: 'Delivered' });

        // Calculate total revenue
        const totalRevenue = deliveredOrders.reduce((acc, order) => acc + order.amount, 0);

        // Send response
        res.json({
            totalUsers,
            totalOrders,
            totalRevenue
        });

    } catch (error) {
        console.error('Error getting stats:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default router;
