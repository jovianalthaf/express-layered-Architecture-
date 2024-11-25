import authController from '../auth/auth.controller.js'
import express from 'express';
import prisma from '../utils/db.js';
import { protectedMiddleware } from "../middleware/authMiddleware.js";
import { register, login, logout, me } from '../auth/auth.controller.js';
const router = express.Router();

router.post('/auth/register', register);
router.post('/auth/login', login);
router.post('/auth/logout', protectedMiddleware, logout);
router.get('/auth/me', protectedMiddleware, me);
export default router;