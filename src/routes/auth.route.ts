import express from "express";
import controller from '../controllers/auth.controller'

const router = express.Router()

router.get('/login', controller.login)

router.post('/me', controller.me)

export default router