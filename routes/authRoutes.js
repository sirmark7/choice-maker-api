import { Router } from 'express'
const router =Router()
import { loginUser, registerAdmin, registerUser } from '../controllers/authController.js';
import { adminMiddleware, authMiddleware } from '../middlewares/authMiddleware.js';


router.post("/register",registerUser);
router.post("/register/admin",authMiddleware,adminMiddleware,registerAdmin);
router.post("/login",loginUser);

export default router