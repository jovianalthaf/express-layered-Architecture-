import jwt from 'jsonwebtoken';

import { findUserById, findAdmin } from '../auth/auth.service.js';


export const protectedMiddleware = async (req, res, next) => {
    let token;

    token = req.cookies.jwt;
    if (token) {
        try {
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await findUserById(decode.id);

            if (!req.user) {
                res.status(401);
                throw new Error("User not found");
            }
            next();

        } catch (error) {
            res.status(401);
            throw new Error("Token failed");
        }
    } else {
        res.status(401);
        throw new Error("Not authorized, no token");
    }
}

export const isAdmin = async (req, res, next) => {
    const isAdminUser = await findAdmin(req.user.id);
    if (isAdminUser) {
        next();
    } else {
        res.status(401);
        throw new Error("Not Authorize,Admin only");
    }
}