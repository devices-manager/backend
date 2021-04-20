import express from 'express';
import { DeviceController } from '../controllers/index';

const router = express.Router();

router.get('/', DeviceController.list);
router.get('/:id', DeviceController.listOne);
router.post('/', DeviceController.create);
router.delete('/', DeviceController.remove);

export default router;
