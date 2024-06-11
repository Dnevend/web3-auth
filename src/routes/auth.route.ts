import express from "express";
import controller from '../controllers/auth.controller';
import authMiddleware from "../middlewares/authMiddleware";

const router = express.Router()

router.post('/init', controller.init)

router.post('/verify', controller.verify)

router.get('/me', authMiddleware, controller.me)

export default router