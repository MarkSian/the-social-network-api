//imports 
import express from 'express';
import {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend
} from '../controller/userController';

const router = express.Router();

// /api/users
router.route('/')
    .get(getAllUsers)
    .post(createUser);

// /api/users/:id
router.route('/:userId')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser);

// /api/users/:id/friends/:friendId
router.route('/:userId/friends/:friendId')
    .post(addFriend)
    .delete(removeFriend);

export default router;
