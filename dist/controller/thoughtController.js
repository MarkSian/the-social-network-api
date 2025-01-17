"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeReaction = exports.addReaction = exports.updateThought = exports.deleteThought = exports.createThought = exports.getThoughtById = exports.getAllThoughts = void 0;
const thoughts_1 = __importDefault(require("../model/thoughts"));
const users_1 = __importDefault(require("../model/users"));
//GET All thoughts
const getAllThoughts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const thoughts = yield thoughts_1.default.find();
        res.status(200).json(thoughts);
    }
    catch (err) {
        res.status(500).json(err);
    }
});
exports.getAllThoughts = getAllThoughts;
//GET thought by ID
const getThoughtById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const thought = yield thoughts_1.default.findById(req.params.userId);
        if (!thought) {
            res.status(404).json({ message: 'No thought found' });
            return;
        }
        res.status(200).json(thought);
    }
    catch (err) {
        res.status(500).json(err);
    }
});
exports.getThoughtById = getThoughtById;
//Create A Thought
const createThought = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { thoughtText, username } = req.body;
        const newThought = new thoughts_1.default({ thoughtText, username });
        yield newThought.save();
        res.status(201).json(newThought);
    }
    catch (error) {
        res.status(500).json({ message: 'Error creating thought', error });
    }
});
exports.createThought = createThought;
//Delete A Thought
const deleteThought = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedThought = yield thoughts_1.default.findByIdAndDelete(req.params.userId);
        if (!deletedThought) {
            res.status(404).json({ message: 'No thought found' });
            return;
        }
        yield users_1.default.findByIdAndUpdate(req.body.userId, { $pull: { thoughts: req.params.userId } });
    }
    catch (err) {
        res.status(500).json(err);
    }
});
exports.deleteThought = deleteThought;
//Update AT hought
const updateThought = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedThought = yield thoughts_1.default.findByIdAndUpdate(req.params.userId, req.body, { new: true });
        if (!updatedThought) {
            res.status(404).json({ message: 'No thought found' });
        }
        res.status(200).json(updatedThought);
    }
    catch (err) {
        res.status(500).json(err);
    }
});
exports.updateThought = updateThought;
//Reaction Controller
// React To A Thought
const addReaction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const thought = yield thoughts_1.default.findById(req.params.userId);
        if (!thought) {
            res.status(404).json({ message: 'No Thoughts' });
            return;
        }
        thought.reactions.push(req.body);
        yield thought.save();
        res.status(200).json(thought);
    }
    catch (err) {
        res.status(500).json(err);
    }
});
exports.addReaction = addReaction;
//Remove A Reaction
const removeReaction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const thought = yield thoughts_1.default.findById(req.params.userId);
        if (!thought) {
            res.status(404).json({ message: 'No Thoughts' });
            return;
        }
        thought.reactions.pull({ _id: req.params.reactionId });
        yield thought.save();
        res.status(200).json(thought);
    }
    catch (err) {
        res.status(500).json(err);
    }
});
exports.removeReaction = removeReaction;
