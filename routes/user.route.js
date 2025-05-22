import express from 'express'
import {
    registerUser,
    getUser,
    getAllUsers,
    updateUser,
    deleteUser
} from '../controllers/user.controller.js';

const userRoute = express.Router();

userRoute.get('/allusers', getAllUsers)
userRoute.get('/:id', getUser)
userRoute.post('/register', registerUser)
userRoute.put('/:id', updateUser)
userRoute.delete('/:id', deleteUser)

export default userRoute