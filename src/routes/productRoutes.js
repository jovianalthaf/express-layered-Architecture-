import { isAdmin, protectedMiddleware } from '../middleware/authMiddleware.js';
import {
    getAllProductController,
    getProductbyIdController,
    createProductController,
    deleteProductController,
    updateProductController
} from '../product/product.controller.js';
import express from 'express';

// const app = express();
const router = express.Router();

router.get('/products', protectedMiddleware, isAdmin, getAllProductController)
router.get('/products/:id', protectedMiddleware, isAdmin, getProductbyIdController)
router.post('/products', protectedMiddleware, isAdmin, createProductController)
router.delete('/products/:id', protectedMiddleware, isAdmin, deleteProductController)
router.put('/products/:id', protectedMiddleware, isAdmin, updateProductController)

// app.use('/products', productController)

export default router;