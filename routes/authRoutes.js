import { Router } from 'express'
const router =Router()
import { loginUser, registerAdmin, registerUser } from '../controllers/authController.js';
import { adminMiddleware, authMiddleware } from '../middlewares/authMiddleware.js';
import { createUser } from '../controllers/userController.js';
import upload from '../middlewares/uploadMiddleware.js';

router.post("/register",upload.single('logo'),registerUser);
router.post("/register/admin",upload.single('logo'),authMiddleware,adminMiddleware,registerAdmin);
router.post("/login",loginUser);

export default router