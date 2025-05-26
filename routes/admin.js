// import express from 'express';
// import userModel from '../models/userModel.js';      // ✅ correct import
// import orderModel from '../models/orderModel.js';    // ✅ correct import

// const router = express.Router();

// router.get('/stats', async (req, res) => {
//     try {
//         // Total user count
//         const totalUsers = await userModel.countDocuments();

//         // Total order count
//         const totalOrders = await orderModel.countDocuments();

//         // Get only delivered orders
//         const deliveredOrders = await orderModel.find({ status: 'Delivered' });

//         // Calculate total revenue
//         const totalRevenue = deliveredOrders.reduce((acc, order) => acc + order.amount, 0);

//         // Send response
//         res.json({
//             totalUsers,
//             totalOrders,
//             totalRevenue
//         });

//     } catch (error) {
//         console.error('Error getting stats:', error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });

// export default router;



import express from 'express';
import userModel from '../models/userModel.js';
import orderModel from '../models/orderModel.js';
import moment from 'moment'; // make sure to install this: npm install moment

const router = express.Router();

router.get('/stats', async (req, res) => {
  try {
    const totalUsers = await userModel.countDocuments();
    const totalOrders = await orderModel.countDocuments();
    const deliveredOrders = await orderModel.find({ status: 'Delivered' });

    const totalRevenue = deliveredOrders.reduce((acc, order) => acc + order.amount, 0);

    // Time boundaries
    const todayStart = moment().startOf('day').toDate();
    const lastWeekStart = moment().subtract(7, 'days').startOf('day').toDate();
    const lastMonthStart = moment().subtract(30, 'days').startOf('day').toDate();

    const [todayOrders, lastWeekOrders, oneMonthOrders] = await Promise.all([
      orderModel.find({ status: 'Delivered', createdAt: { $gte: todayStart } }),
      orderModel.find({ status: 'Delivered', createdAt: { $gte: lastWeekStart } }),
      orderModel.find({ status: 'Delivered', createdAt: { $gte: lastMonthStart } }),
    ]);

    const calcRevenue = (orders) => orders.reduce((sum, order) => sum + order.amount, 0);

    res.json({
      totalUsers,
      totalOrders,
      totalRevenue,
      todayOrders: todayOrders.length,
      lastWeekOrders: lastWeekOrders.length,
      oneMonthOrders: oneMonthOrders.length,
      todayRevenue: calcRevenue(todayOrders),
      lastWeekRevenue: calcRevenue(lastWeekOrders),
      oneMonthRevenue: calcRevenue(oneMonthOrders),
    });

  } catch (error) {
    console.error('Error getting stats:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
