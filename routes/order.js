import express from 'express';
import orderModel from '../models/order.js';

const router = express.Router();

// Get all orders
router.get('/admin', async (req, res) => {
  try {
    const orders = await orderModel.find().sort({ date: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete an order
router.delete('/admin/:id', async (req, res) => {
  try {
    await orderModel.findByIdAndDelete(req.params.id);
    res.json({ message: 'Order deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
