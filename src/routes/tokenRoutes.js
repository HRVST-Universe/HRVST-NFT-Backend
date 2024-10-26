import { Router } from 'express';
import { airdropToken, createToken } from '../controllers/tokenController.js';
import { validateToken, validateAirdrop } from '../middleware/validate.js';

const router = Router();

router.post('/create', validateToken, createToken);
router.post('/airdrop', validateAirdrop, airdropToken);

export default router;