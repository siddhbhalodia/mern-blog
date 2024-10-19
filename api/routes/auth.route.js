import express from "express";
import { signin, signup, google, forgotPassword, resetPassword } from "../controllers/auth.controller.js";

const router=express.Router();

router.post('/signup',signup);
router.post('/signin',signin);
router.post('/google',google)
router.post('/forgotpassword', forgotPassword)
router.post('/resetpassword/:token', resetPassword);
export default router