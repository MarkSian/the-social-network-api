//import
import { Request, Response } from 'express';
import  Thought  from '../model/thoughts';
import  User  from '../model/users';

//GET All thoughts
export const getAllThoughts = async (req: Request, res: Response) => {
    try {
        const thoughts = await Thought.find();
        res.status(200).json(thoughts);
    } catch (err) {
        res.status(500).json(err);
    }
};

//GET thought by ID
export const getThoughtById = async (req: Request, res: Response): Promise<void> => {
    try {
        const thought = await Thought.findById(req.params.userId);
        if (!thought) {
            res.status(404).json({ message: 'No thought found!' });
            return;
        }
        res.status(200).json(thought);
    } catch (err) {
        res.status(500).json(err);
    }
};