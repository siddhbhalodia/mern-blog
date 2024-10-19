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
    try {
        const { userId, postId } = req.params;
        const bookmark = await Bookmark.findOneAndDelete({ userId, postId });
        if (!bookmark) {
            return res.status(404).json({ message: 'Bookmark not found' });
        }
        res.json({ message: 'Bookmark deleted successfully' });
    } catch (error) {
        console.error('Error deleting bookmark:', error);
        res.status(500).json({ message: 'Internal server error' });
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

export const getBookmarkedPosts= async (req, res, next) => {
    try{
        const bookmarks = await Bookmark.find({userId:req.params.userId}).sort({   //it will return like {userId:...., postId: {_id:..., content:....,title:....,slug:...,userId:...,image:...}}
            createdAt:-1
        }).populate("postId")
        const posts = bookmarks.map(bookmark => bookmark.postId)
        res.status(200).json(posts)
    }catch(error){
        next(error)
    }
}
