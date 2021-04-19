import express from 'express';
import deviceRouter from './device';
import categoryRouter from './category';

const router = express.Router();

router.use('/device', deviceRouter);
router.use('/category', categoryRouter);

export default router;
