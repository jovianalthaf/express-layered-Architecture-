import express from 'express';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client'
import productController from './product/product.controller.js'
const prisma = new PrismaClient();
const app = express();


dotenv.config();
const PORT = process.env.PORT;
app.use(express.json())

app.get("/api", (req, res) => {
    res.send("welcome to my test");
});

app.use('/products', productController)

app.listen(PORT, () => {
    console.log("Express API Running in : " + PORT);
});
