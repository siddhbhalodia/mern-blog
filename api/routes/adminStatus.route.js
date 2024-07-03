import express from "express";
import {verifyToken} from "../utils/verifyUser.js";
import { create,deleteadminstatus,deleteadminstatususer,getadminstatususer ,getadminstatus } from "../controllers/adminStatus.controller.js";

const router = express.Router();

router.post('/create',verifyToken,create)
router.get('/getadminstatus',verifyToken,getadminstatus)
router.get('/getadminstatususer',verifyToken,getadminstatususer)
router.delete('/deleteadminstatus',verifyToken,deleteadminstatus)
router.delete('/deleteadminstatususer/:userId',verifyToken,deleteadminstatususer)

export default router;