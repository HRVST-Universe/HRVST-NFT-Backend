import logger from '../utils/logger.js';
import { getNFTProgram } from '../utils/solanaClient.js';

export const mintNFT = async (req, res) => {
  try {
    const { name, description, image } = req.body;
    const program = await getNFTProgram();
    
    const nft = await program.mint({
      name,
      description,
      image,
    });

    logger.info(`NFT minted successfully: ${nft.id}`);
    res.json({ success: true, nft });
  } catch (error) {
    logger.error('Mint NFT error:', error);
    res.status(500).json({ error: error.message });
  }
};

export const createOpenEdition = async (req, res) => {
  try {
    const { name, description, image, maxSupply } = req.body;
    const program = await getNFTProgram();

    const openEdition = await program.createNFTDrop({
      name,
      description,
      image,
      maxSupply,
    });

    logger.info(`Open edition created: ${openEdition.id}`);
    res.json({ success: true, openEdition });
  } catch (error) {
    logger.error('Create Open Edition error:', error);
    res.status(500).json({ error: error.message });
  }
};

export const airdropNFT = async (req, res) => {
  try {
    const { recipient, tokenId } = req.body;
    const program = await getNFTProgram();

    const tx = await program.transfer(recipient, tokenId);
    
    logger.info(`NFT airdropped to ${recipient}`);
    res.json({ success: true, transaction: tx });
  } catch (error) {
    logger.error('Airdrop NFT error:', error);
    res.status(500).json({ error: error.message });
  }
};