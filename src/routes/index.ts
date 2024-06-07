import express from 'express'
import authRoutes from './auth.route'

const router = express.Router();

router.get('/', (req, res) => {
    res.send('web3-auth');
});

router.use('/auth', authRoutes)

export default router;