import { NextFunction, Request, Response } from "express";
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.authFail('Not authenticated');
    }

    try {
        const payload = jwt.verify(token, JWT_SECRET);
        req.address = payload.address
        next();
    } catch (error) {
        res.authFail();
    }
};

declare global {
    namespace Express {
        interface Request {
            address?: string;
        }
    }
}

export default authMiddleware;