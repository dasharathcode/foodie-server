import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import userRouter from './routes/userRoute.js'
import productRouter from './routes/productRoute.js'
import cartRouter from './routes/cartRoute.js'
import orderRouter from './routes/orderRoute.js'

// App Config
const app = express()
const port = process.env.PORT || 8000
connectDB()
connectCloudinary()

// middlewares
app.use(express.json())
app.use(cors())








import adminRoutes from './routes/admin.js';
app.use('/api/admin', adminRoutes);


import userListRoutes from './routes/userList.js';

app.use('/api/userlist', userListRoutes);


import bannerRoutes from './routes/banner.js';
app.use('/api/banner', bannerRoutes);




app.use(cors({
    origin: [
      "http://localhost:5174",         // Allow frontend from localhost
      ,"http://localhost:5173",
      "https://foodie-admin-umber.vercel.app",
      "https://foodiee-three.vercel.app"
    ],
    credentials: true
  }));
  








// api endpoints
app.use('/api/user',userRouter)
app.use('/api/product',productRouter)
app.use('/api/cart',cartRouter)
app.use('/api/order',orderRouter)

app.get('/',(req,res)=>{
    res.send("API Working")
})

app.listen(port, () => console.log(`Server running on port ${port}`));