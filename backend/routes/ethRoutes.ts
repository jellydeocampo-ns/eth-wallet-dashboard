import { Router } from 'express';
import { mintTokenController, getAccountController } from '../controllers/ethController';

const router = Router();

router.post('/mint', mintTokenController);
router.get('/account/:address', getAccountController);

export default router;
