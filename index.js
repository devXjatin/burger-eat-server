import app from './app.js';
import {connectDB} from './config/database.js'
import Razorpay from 'razorpay'
//databse connected
connectDB()

//integration of razorpay
export const instance = new Razorpay({
    key_id : process.env.RAZORPAY_API_KEY,
    key_secret: process.env.RAZORPAY_API_SECRET

})

//server is running
app.listen(process.env.PORT,()=> console.log(`Server is running on Port ${process.env.PORT}, IN ${process.env.NODE_ENV} MODE`))