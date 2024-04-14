import Bookmark from "../models/bookmark.model.js";
import { errorHandler } from "../utils/error.js";

export const create = async (req, res, next) => {
    try{
        const {userId,postId} = req.body
        if(userId !== req.user.id){
            return next(errorHandler(403,"You are not allowed to create this bookmark"))
        }
        const newBookmark = new Bookmark({
            userId,
            postId
        })
        await newBookmark.save()
        res.status(200).json(newBookmark)
    }catch(error){
        next(error)
    }
}

export const deletebookmark = async (req, res, next) => {
    try{
        const bookmark = await Bookmark.findById(req.params.bookmarkId)
        if(!bookmark){
            return next(errorHandler(404,"Bookmark not found"))
        }
        if(bookmark.userId !== req.user.id){
            return next(errorHandler(403,"You are not allowed to delete this bookmark"))
        }
        await Bookmark.findByIdAndDelete(req.params.bookmarkId)
        res.status(200).json("Bookmark has been deleted")
    }catch(error){
        next(error)
    }
}

export const getbookmarks = async (req, res, next) => {
    try{
        const bookmarks = await Bookmark.find({userId:req.params.userId}).sort({
            createdAt:-1
        })
        res.status(200).json(bookmarks)
    }catch(error){
        next(error)
    }
}