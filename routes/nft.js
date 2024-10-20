const express = require('express');
const { ThirdwebSDK } = require('@thirdweb-dev/sdk');
const { Connection, PublicKey } = require('@solana/web3.js');

const router = express.Router();

// Initialize the Thirdweb SDK
const sdk = ThirdwebSDK.fromPrivateKey(process.env.SOLANA_NETWORK, process.env.WALLET_PRIVATE_KEY);

// Route to mint NFTs (open editions) and airdrop them
router.post('/mint-open-edition', async (req, res) => {
  const { collectionAddress, hashList, numberOfEditions } = req.body;

  try {
    // Load the NFT collection
    const collection = await sdk.getNFTCollection(collectionAddress);

    const mintedNFTs = [];

    // Mint the specified number of editions and airdrop them to the hash list
    for (let i = 0; i < numberOfEditions; i++) {
      const recipientWallet = hashList[i];
      const nft = await collection.mintTo(recipientWallet, {
        name: `Open Edition NFT #${i + 1}`,
        description: 'Minted from the open edition collection',
      });

      console.log(`Minted NFT to ${recipientWallet}. NFT Address: ${nft.mintAddress}`);
      mintedNFTs.push(nft.mintAddress);
    }

    res.json({
      status: 'success',
      message: `Successfully minted and airdropped ${numberOfEditions} NFTs.`,
      mintedNFTs,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to mint NFTs.',
      error: error.message,
    });
  }
});

module.exports = router;
