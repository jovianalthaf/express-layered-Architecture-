import productController from '../product/product.controller.js'
import express from 'express';

const app = express();
app.use('/products', productController)

export default app;