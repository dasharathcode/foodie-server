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


// import express from 'express';
// import userModel from '../models/userModel.js';
// import orderModel from '../models/orderModel.js';

// const router = express.Router();

// router.get('/stats', async (req, res) => {
//     try {
//         const totalUsers = await userModel.countDocuments();
//         const totalOrders = await orderModel.countDocuments();

//         const deliveredOrders = await orderModel.find({ status: 'Delivered' });
//         const totalRevenue = deliveredOrders.reduce((acc, order) => acc + order.amount, 0);

//         // Date boundaries
//         const today = new Date();
//         today.setHours(0, 0, 0, 0); // Start of today

//         const weekStart = new Date();
//         weekStart.setDate(weekStart.getDate() - 7);
//         weekStart.setHours(0, 0, 0, 0); // Start of 7 days ago

//         // New Signups Today
//         const newUsersToday = await userModel.countDocuments({ createdAt: { $gte: today } });

//         // New Signups This Week
//         const newUsersThisWeek = await userModel.countDocuments({ createdAt: { $gte: weekStart } });

//         res.json({
//             totalUsers,
//             totalOrders,
//             totalRevenue,
//             newUsersToday,
//             newUsersThisWeek,
//             deliveredOrders

//         });

//     } catch (error) {
//         console.error('Error getting stats:', error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });







// export default router;





// import express from 'express';
// import userModel from '../models/userModel.js';
// import orderModel from '../models/orderModel.js';

// const router = express.Router();

// router.get('/stats', async (req, res) => {
//     try {
//         const totalUsers = await userModel.countDocuments();
//         const totalOrders = await orderModel.countDocuments();

//         // ✅ Only count delivered orders instead of fetching full documents
//         const deliveredOrdersCount = await orderModel.countDocuments({ status: 'Delivered' });

//         // ✅ Total revenue from delivered orders only
//         const deliveredOrders = await orderModel.find({ status: 'Delivered' });
//         const totalRevenue = deliveredOrders.reduce((acc, order) => acc + order.amount, 0);

//         // Date boundaries
//         const today = new Date();
//         today.setHours(0, 0, 0, 0); // Start of today

//         const weekStart = new Date();
//         weekStart.setDate(weekStart.getDate() - 7);
//         weekStart.setHours(0, 0, 0, 0); // Start of 7 days ago

//         const newUsersToday = await userModel.countDocuments({ createdAt: { $gte: today } });
//         const newUsersThisWeek = await userModel.countDocuments({ createdAt: { $gte: weekStart } });

//         // ✅ Return count instead of full list
//         res.json({
//             totalUsers,
//             totalOrders,
//             totalRevenue,
//             deliveredOrdersCount,
//             newUsersToday,
//             newUsersThisWeek
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

const router = express.Router();

router.get('/stats', async (req, res) => {
  try {
    const totalUsers = await userModel.countDocuments();
    const totalOrders = await orderModel.countDocuments();
    const deliveredOrdersCount = await orderModel.countDocuments({ status: 'Delivered' });

    const deliveredOrders = await orderModel.find({ status: 'Delivered' });
    const totalRevenue = deliveredOrders.reduce((acc, order) => acc + order.amount, 0);

    const now = new Date();

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const weekStart = new Date();
    weekStart.setDate(now.getDate() - 7);
    weekStart.setHours(0, 0, 0, 0);

    const monthStart = new Date();
    monthStart.setDate(now.getDate() - 30);
    monthStart.setHours(0, 0, 0, 0);

    const newUsersToday = await userModel.countDocuments({ createdAt: { $gte: today } });
    const newUsersThisWeek = await userModel.countDocuments({ createdAt: { $gte: weekStart } });

    const todayOrders = await orderModel.countDocuments({ createdAt: { $gte: today } });
    const thisWeekOrders = await orderModel.countDocuments({ createdAt: { $gte: weekStart } });
    const thisMonthOrders = await orderModel.countDocuments({ createdAt: { $gte: monthStart } });

    res.json({
      totalUsers,
      totalOrders,
      totalRevenue,
      deliveredOrdersCount,
      newUsersToday,
      newUsersThisWeek,
      todayOrders,
      thisWeekOrders,
      thisMonthOrders,
    });

  } catch (error) {
    console.error('Error getting stats:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
