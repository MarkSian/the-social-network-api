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
            res.status(404).json({ message: 'No thought found' });
            return;
        }
        res.status(200).json(thought);
    } catch (err) {
        res.status(500).json(err);
    }
};


//Create A Thought
export const createThought = async (req: Request, res: Response) => {
    try {
        const newThought = await Thought.create(req.body);
        await User.findByIdAndUpdate(req.body.userId, { $push: { thoughts: newThought._id } });
        res.status(201).json(newThought);
    } catch (err) {
        res.status(500).json(err);
    }
};

//Delete A Thought
export const deleteThought = async (req: Request, res: Response): Promise<void> => {
    try {
        const deletedThought = await Thought.findByIdAndDelete(req.params.userId);
        if (!deletedThought) {
            res.status(404).json({ message: 'No thought found' });
            return;
        }
        await User.findByIdAndUpdate(req.body.userId, { $pull: { thoughts: req.params.userId } });
    } catch (err) {
        res.status(500).json(err);
    }
};

//Update AT hought
export const updateThought = async (req: Request, res: Response): Promise<void> => {
    try {
        const updatedThought = await Thought.findByIdAndUpdate(req.params.userId, req.body, { new: true });
        if (!updatedThought) {
            res.status(404).json({ message: 'No thought found' });
        }
        res.status(200).json(updatedThought);
    } catch (err) {
        res.status(500).json(err);
    }
};



//Reaction Controller
// React To A Thought
export const addReaction = async (req: Request, res: Response): Promise<void> => {
    try {
        const thought = await Thought.findById(req.params.userId);
        if (!thought) {
            res.status(404).json({ message: 'No Thoughts' });
            return;
        }

        
        thought.reactions.push(req.body);
        await thought.save();

        res.status(200).json(thought);
    } catch (err) {
        res.status(500).json(err);
    }
};

//Remove A Reaction
export const removeReaction = async (req: Request, res: Response): Promise<void> => {
    try {
        const thought = await Thought.findById(req.params.userId); 
        if (!thought) {
            res.status(404).json({ message: 'No Thoughts' });
            return;
        }

        
        thought.reactions.pull({ _id: req.params.reactionId }); 
        await thought.save();

        res.status(200).json(thought);
    } catch (err) {
        res.status(500).json(err);
    }
};