import express, { urlencoded } from 'express';
import dotenv from 'dotenv'
import {connectPassport} from "./utils/Provider.js"
import session from 'express-session';
import cookieParser from 'cookie-parser';
import { errorMiddleware } from './api/v1/middlewares/errorMiddleware.js';
import passport from 'passport';
import cors from 'cors'

const app = express();
export default app

dotenv.config({
    path:"./env/config.env"
})

//middleware
app.use(session({
    secret:process.env.SESSION_SECRET,
    resave:false,
    saveUninitialized:false,

    cookie:{
        secure:process.env.NODE_ENV === "development"?false:true,
        httpOnly:process.env.NODE_ENV === "development"?false:true,
        sameSite:process.env.NODE_ENV === "development"?false:"none"
    }
}))
app.use(cookieParser())
app.use(express.json())
app.use(urlencoded({
    extended:true
}))
app.use(passport.authenticate("session"))
app.use(passport.initialize());
app.use(passport.session())
app.enable("trust proxy");
connectPassport()

app.use(cors({
    credtionals:true,
    origin:process.env.FRONTEND_URL,
    method:["GET", "POST", "PUT", "DELETE"]
}))

app.get('/', (req, res)=>{
    res.send("<h1>WORKING!!!</>")
})

// Importing routes
import userRoute from "./api/v1/routes/user.js";
import orderRoute from "./api/v1/routes/order.js"

app.use("/api/v1", userRoute);
app.use("/api/v1", orderRoute);


//using error middleware
app.use(errorMiddleware)


