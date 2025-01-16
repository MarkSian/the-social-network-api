//imports 
import { Request, Response } from 'express';
import User from '../model/users';

// GET all users
export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.find()
            .populate({
                path: 'thoughts',
                select: 'thoughtText createdAt', // Select only the fields you want
            })
            .populate('friends');
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json(err);
    }
};

// GET a user by id
export const getUserById = async (req: Request, res: Response): Promise<void> => {
    try {
        const user = await User.findById(req.params.userId)
            .populate({
                path: 'thoughts',
                select: 'thoughtText createdAt', // Select only the fields you want
            })
            .populate('friends');
        if (!user) {
            res.status(404).json({ message: 'No user found with this id!' });
            return;
        }
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json(err);
    }
};