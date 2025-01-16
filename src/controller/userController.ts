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

//Create A User
export const createUser = async (req: Request, res: Response) => {
    try {
        const user = await User.create(req.body);
        res.status(201).json(user);
    } catch (err) {
        res.status(400).json(err);
    }
};

//Delete A User
export const deleteUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const user = await User.findByIdAndDelete(req.params.userId);
        if (!user) {
            res.status(404).json({ message: 'No user found with this id!' });
            return;
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

//Update A User
export const updateUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const user = await User.findByIdAndUpdate(req.params.userId, req.body, { new: true });
        if (!user) {
            res.status(404).json({ message: 'No user found with this id!' });
            return;
        }
        res.status(200).json(user);
    } catch (err) {
        res.status(400).json(err);
    }
};