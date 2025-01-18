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
exports.removeFriend = exports.addFriend = exports.updateUser = exports.deleteUser = exports.createUser = exports.getUserById = exports.getAllUsers = void 0;
const users_1 = __importDefault(require("../model/users"));
// GET all users
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield users_1.default.find()
            .populate({
            path: 'thoughts',
            select: 'thoughtText createdAt', // Select only the fields you want
        })
            .populate('friends');
        res.status(200).json(users);
    }
    catch (err) {
        res.status(500).json(err);
    }
});
exports.getAllUsers = getAllUsers;
// GET a user by id
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield users_1.default.findById(req.params.userId)
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
    }
    catch (err) {
        res.status(500).json(err);
    }
});
exports.getUserById = getUserById;
//Create A User
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield users_1.default.create(req.body);
        res.status(201).json(user);
    }
    catch (err) {
        res.status(400).json(err);
    }
});
exports.createUser = createUser;
//Delete A User
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield users_1.default.findByIdAndDelete(req.params.userId);
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        res.status(200).json({ message: 'User deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'error', error });
    }
});
exports.deleteUser = deleteUser;
//Update A User
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield users_1.default.findByIdAndUpdate(req.params.userId, req.body, { new: true });
        if (!user) {
            res.status(404).json({ message: 'No user found with this id!' });
            return;
        }
        res.status(200).json(user);
    }
    catch (err) {
        res.status(400).json(err);
    }
});
exports.updateUser = updateUser;
//Add A friend
const addFriend = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield users_1.default.findByIdAndUpdate(req.params.userId, { $addToSet: { friends: req.params.friendId } }, { new: true });
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        res.status(200).json(user);
    }
    catch (err) {
        res.status(500).json(err);
    }
});
exports.addFriend = addFriend;
//Remove A Friend
const removeFriend = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield users_1.default.findByIdAndUpdate(req.params.userId, { $pull: { friends: req.params.friendId } }, { new: true });
        if (!user) {
            res.status(404).json({ message: 'No user found with this id!' });
            return;
        }
        res.status(200).json(user);
    }
    catch (err) {
        res.status(500).json(err);
    }
});
exports.removeFriend = removeFriend;
