import express from "express";
import {verifyToken} from "../utils/verifyUser.js";
import { create,deletebookmark,getbookmarks } from "../controllers/bookmark.controller.js";

const router = express.Router();

router.post('/create',verifyToken,create)
router.get('/getbookmarks/:userId',verifyToken,getbookmarks)
router.delete('/deletebookmark/:bookmarkId',verifyToken,deletebookmark)

export default router;