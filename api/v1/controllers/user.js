import {asyncError} from "../middlewares/errorMiddleware.js"
import {User} from "../models/User.js"
import {Order} from "../models/order.js"

//get my profile business logic
export const getMyProfile = (req, res, next)=>{
    res.status(200).json({
        success:true,
        user:req.user
    })
}

//logout logic
export const logout = (req, res, next) => {
    req.session.destroy((err) => {
      if (err) return next(err);
      res.clearCookie("connect.sid", {
        secure: process.env.NODE_ENV === "development" ? false : true,
        httpOnly: process.env.NODE_ENV === "development" ? false : true,
        sameSite: process.env.NODE_ENV === "development" ? false : "none",
      });
      res.status(200).json({
        message: "Logged Out",
      });
    });
  };

//get all users to admin role
export const getAdminUsers = asyncError(async(req, res, next)=>{
    const users = await User.find({});
    res.status(200).json({
        success:true,
        users
    })
})

//get admin stats
export const getAdminStats = asyncError(async(req, res, next)=>{
    const usersCount = await User.countDocuments();
    
    const orders = await Order.find({})

    const preparingOrders = orders.filter(i=>i.orderStatus === "Preparing")
    const shippedOrders = orders.filter(i=>i.orderStatus === "Shipped")
    const deliveredOrders = orders.filter(i=>i.orderStatus === "Delivered")
    
    let totalIncome = 0;

    orders.forEach(item=>{
        totalIncome+=item.totalAmount;
    })

    res.status(200).json({
        success:true,
        usersCount,
        ordersCount:{
            total:orders.length,
            preparing:preparingOrders.length,
            shipped:shippedOrders.length,
            delivered:deliveredOrders.length,
        },
        totalIncome
    })
})