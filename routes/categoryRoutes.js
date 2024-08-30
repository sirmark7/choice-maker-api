// routes/user.routes.js
import { Router } from 'express';
import { createCategory,getCategories,getCategoryById,updateCategory,deleteCategory } from '../controllers/categoryControler.js';

const router = Router();

router.post('/', createCategory);
router.get('/', getCategories);
router.get('/:id', getCategoryById);
router.put('/:id', updateCategory);
router.delete('/:id', deleteCategory);

export default router;
