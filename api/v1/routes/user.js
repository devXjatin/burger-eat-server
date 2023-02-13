import express from "express";
import passport from "passport";
import { getAdminStats, getAdminUsers, getMyProfile, logout } from "../controllers/user.js";
import { authorizeAdmin, isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

//google oauth 2.0 route
router.get("/google-oauth", passport.authenticate("google",{
    scope:["profile"]
}))

//login route 
router.get(
    "/login",
    passport.authenticate("google", {
      successRedirect: process.env.FRONTEND_URL,
    })
  );

//profile route
router.get("/me", isAuthenticated, getMyProfile)

//logout route
router.get("/logout",logout)

//admin route
router.get("/admin/users", isAuthenticated, authorizeAdmin, getAdminUsers)

//admin stats route
router.get("/admin/stats", isAuthenticated, authorizeAdmin,getAdminStats)



export default router;