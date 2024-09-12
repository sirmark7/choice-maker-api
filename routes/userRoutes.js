// routes/user.routes.js
import { Router } from 'express';
import { createUser, getUsers, getUserById, updateUser, deleteUser } from '../controllers/userController.js';
import upload from '../middlewares/uploadMiddleware.js';
const router = Router();

router.post('/',upload.single('logo'), createUser);
router.get('/', getUsers);
router.get('/:id', getUserById);
router.put('/:id',upload.single('logo'), updateUser);
router.delete('/:id', deleteUser);


export default router;
