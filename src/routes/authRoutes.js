import authController from '../auth/auth.controller.js'
import express from 'express';

const app = express();
app.use('/auth', authController)

export default app;