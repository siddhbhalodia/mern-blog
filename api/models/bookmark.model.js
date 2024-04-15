import mongoose from "mongoose";

const bookmarkSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    postId: {
        type: String,
        required: true,
        ref:"Post"
    }
},{timestamps: true})

const Bookmark = mongoose.model('Bookmark', bookmarkSchema);

export default Bookmark