import express from 'express';
import { CategoryController } from '../controllers/index';

const router = express.Router();

router.get('/', CategoryController.list);
router.get('/:id', CategoryController.listOne);
router.post('/', CategoryController.create);
router.delete('/', CategoryController.remove);

export default router;
