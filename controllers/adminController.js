import userModel from '../models/userModel.js';
import orderModel from '../models/orderModel.js';

export const getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await userModel.countDocuments();
    const totalOrders = await orderModel.countDocuments();
    const orders = await orderModel.find({ status: 'delivered' });

    const totalRevenue = orders.reduce((sum, order) => sum + order.amount, 0);

    res.json({
      success: true,
      data: {
        totalUsers,
        totalOrders,
        totalRevenue
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: 'Failed to fetch stats' });
  }
};
