import express from "express";
import prisma from "../db/index.js"

import { RegisterUser, EmailUser } from "./auth.service.js"
const router = express.Router();
router.post('/register', async (req, res) => {
    try {
        const newUserData = req.body;
        const existingUser = await EmailUser(newUserData.email);
        if (existingUser) {
            return res.status(409).json({
                message: "Email already registered",
                statusCode: 409,
            })
        }
        const userRegister = await RegisterUser(newUserData);
        res.status(200).json({
            message: "Success create Account",
            statusCode: 201,
            data: userRegister
        });
    } catch (err) {
        res.status(404).json({
            message: err.message || "An error occurred",
            statusCode: 404,
        });
    }


})
export default router;