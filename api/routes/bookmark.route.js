import express from "express";
import {verifyToken} from "../utils/verifyUser.js";
import { create,deletebookmark,getBookmarkedPosts,getbookmarks } from "../controllers/bookmark.controller.js";

const router = express.Router();

router.post('/create',verifyToken,create)
router.get('/getbookmarks/:userId',verifyToken,getbookmarks)
router.get('/getbookmarkedposts/:userId',verifyToken,getBookmarkedPosts)
router.delete('/deletebookmark/:userId/:postId',verifyToken,deletebookmark)

export default router;