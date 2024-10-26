import { Router } from 'express';
import { mintNFT, createOpenEdition, airdropNFT } from '../controllers/nftController.js';
import { validateNFTMint, validateOpenEdition, validateAirdrop } from '../middleware/validate.js';

const router = Router();

router.post('/mint', validateNFTMint, mintNFT);
router.post('/open-edition', validateOpenEdition, createOpenEdition);
router.post('/airdrop', validateAirdrop, airdropNFT);

export default router;