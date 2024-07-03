import AdminStatus from "../models/adminStatus.model.js";
import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";

export const create = async (req, res, next) => {
    try{
        const userId = req.user.id
        const newAdminStatus = new AdminStatus({
            userId
        })
        await newAdminStatus.save()
        res.status(200).json(newAdminStatus)
    }catch(error){
        next(error)
    }
}

export const getadminstatus = async (req, res, next) => {
    try{
        const adminstatus = await AdminStatus.find()
        if(!adminstatus){
            return next(errorHandler(404,"AdminStatus not found"))
        }
        res.status(200).json(adminstatus)
    }catch(error){
        next(error) 
    }
}

export const getadminstatususer = async (req, res, next) => {
    try{
        const adminstatus = await AdminStatus.find().populate('userId')
        if(!adminstatus){
            return next(errorHandler(404,"AdminStatus not found"))
        }
        res.status(200).json(adminstatus)
    }catch(error){
        next(error) 
    }
}

export const deleteadminstatus = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const adminstatus = await AdminStatus.findOneAndDelete({ userId: userId });
        if (!adminstatus) {
            return res.status(404).json({ message: 'AdminStatus not found' });
        }
        res.json({ message: 'AdminStatus deleted successfully' });
    } catch (error) {
        next(error);
    }
}

export const deleteadminstatususer = async (req, res, next) => {
    try {
        const userId = req.params.userId;
        console.log(userId) 
        const adminstatus = await AdminStatus.findOneAndDelete({ userId: userId })
        const updatedUser = await User.findOneAndUpdate({ _id: userId }, { isAdmin: true }, { new: true });
        if (!adminstatus) {
            return res.status(404).json({ message: 'AdminStatus not found' });
        }
        res.json({ message: 'AdminStatus deleted successfully' });
    } catch (error) {
        next(error);
    }
}