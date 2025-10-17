import express from 'express'
import { loginUser,registerUser,adminLogin,userList,deleteUser,updateUser, getUser } from '../controllers/userController.js'
import authUser from '../middleware/auth.js';

const userRouter = express.Router();
userRouter.post('/register',registerUser)
userRouter.post('/login',loginUser)
userRouter.post('/admin',adminLogin)
userRouter.get('/list',userList)
userRouter.post('/delete',deleteUser)
userRouter.put('/update/:id',authUser,updateUser)
userRouter.post('/single',getUser)

export default userRouter;