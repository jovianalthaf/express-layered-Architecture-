import { getAllCategoryController, getCategoryByIdController, createDataCategoryController } from "../category/category.controller.js";
import express from 'express';
const router = express.Router();

router.get('/category', getAllCategoryController);
router.get('/category/:id', getCategoryByIdController);
router.post('/category', createDataCategoryController);

export default router;