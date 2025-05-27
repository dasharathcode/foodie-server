// routes/orderRoutes.js বা যেখানে রাউট বানাও

import express from 'express'
import { removeOrder } from '../controllers/orderController.js'

const router = express.Router()

router.post('/remove', removeOrder)

export default router
