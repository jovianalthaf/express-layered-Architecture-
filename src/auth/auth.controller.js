import express from "express";
import prisma from "../utils/db.js";
import jwt from "jsonwebtoken";

import bcrypt from "bcrypt";
import { RegisterUser, EmailUser, userAndToken, findUserById } from "./auth.service.js";
import { protectedMiddleware } from "../middleware/authMiddleware.js";

// router
const router = express.Router();

// JWT
const signToken = (id) => {
    return jwt.sign(
        { id },
        process.env.JWT_SECRET, {
        expiresIn: '1h'
    });
}

const generateRefreshToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_TOKEN_REFRESH, {
        expiresIn: '7d',
    })
}

const createResToken = async (user, statusCode, res) => {
    // get user id from database
    const accessToken = signToken(user.id);
    const refreshToken = generateRefreshToken(user.id);

    await userAndToken(user.id, refreshToken);
    const cookieOptionToken = {
        expires: new Date(
            Date.now() + 24 * 60 * 60 * 1000
            // Date.now() + 1 * 1000, // 1 detik dalam milidetik

        ),
        httpOnly: true,
        security: false,
    }
    const cookiesOptionRefresh = {
        expires: new Date(
            Date.now() + 7 * 24 * 60 * 60 * 1000
        )
    }
    res.cookie('jwt', accessToken, cookieOptionToken);
    res.cookie('refreshToken', refreshToken, cookiesOptionRefresh);
    res.status(statusCode).json({
        message: "Login successful",
        user,
        password: undefined,
    })
}

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
router.post('/login', async (req, res) => {
    try {
        // validation input user
        if (!req.body.email && !req.body.passoword) {
            res.status(400);
            throw new Error("Input email and password required")
        }
        const email = req.body.email;
        // 2. get user data email
        const userData = await EmailUser(email);
        if (!userData) {
            throw new Error("User not found");
        }
        //  from request user compare to userData in database
        if (userData && (await bcrypt.compare(req.body.password, userData.password))) {
            // RESPONSE IF LOGIN SUCCESS
            createResToken(userData, 200, res)
        } else {
            res.status(400);
            throw new Error('Invalid Credentials')
        }
    } catch (err) {
        res.status(404).json({
            message: err.message || "An error occurred",
            statusCode: 404,
        });
    }


})
router.get('/me', protectedMiddleware, async (req, res) => {
    try {
        if (!req.user || !req.user.id) {
            return res.status(401).json({ message: "Not Authorized, no user found" });
        }

        const user = await findUserById(req.user.id);

        if (user) {
            res.status(200).json({ user });
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        console.error(error); // Optional: Untuk debugging
        res.status(500).json({ message: "Server Error" });
    }

});
export const currentUser = async (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expire: new Date(Date.now())
    })

    await userAndToken(req.user.id, null);

    res.cookie('refreshToken', '', {
        httpOnly: true,
        expire: new Date(Date.now())
    })
    res.status(200).json({
        message: 'Logout success'
    })
}
router.post('/logout', protectedMiddleware, currentUser)



export default router;