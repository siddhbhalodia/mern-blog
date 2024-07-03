import mongoose from "mongoose";

const adminStatusSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        unique: true,
        ref:"User"
    },
},{timestamps: true})

const AdminStatus = mongoose.model('Admin Status', adminStatusSchema);

export default AdminStatus