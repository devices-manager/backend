import express from 'express';
import accountRouter from './account';
import transactionRouter from './transaction';
import personRouter from './person';

const router = express.Router();

router.use('/account', accountRouter);
router.use('/person', personRouter);
router.use('/transaction', transactionRouter);

export default router;
