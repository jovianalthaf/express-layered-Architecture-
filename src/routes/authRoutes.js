import authController from '../auth/auth.controller.js'
import express from 'express';
import prisma from '../utils/db.js';
import { isAdmin } from "../middleware/authMiddleware.js";
const app = express();
app.use('/auth', authController)

export default app;