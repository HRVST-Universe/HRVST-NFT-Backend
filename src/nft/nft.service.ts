import { Injectable, Logger } from '@nestjs/common';
import { Metaplex, bundlrStorage, keypairIdentity } from '@metaplex-foundation/js';
import { Connection, clusterApiUrl, Keypair, PublicKey } from '@solana/web3.js';
import fs from 'fs';

@Injectable()
export class NftService {
  private readonly logger = new Logger(NftService.name);
  private readonly metaplex;

  constructor() {
    // Initialize Solana connection (devnet)
    const connection = new Connection(clusterApiUrl('devnet'));

    // Load keypair from a file (replace with your actual keypair path)
    const keypairFile = fs.readFileSync('./src/config/keypair.json');
    const keypair = Keypair.fromSecretKey(Buffer.from(JSON.parse(keypairFile.toString())));

    // Initialize Metaplex with Bundlr storage
    this.metaplex = Metaplex.make(connection)
      .use(keypairIdentity(keypair))
      .use(bundlrStorage({
        address: 'https://devnet.bundlr.network',
        providerUrl: 'https://api.devnet.solana.com',
        timeout: 60000,
      }));

    this.logger.log('Metaplex instance initialized with Bundlr storage');
  }

  // Mint a new NFT
  async mintNft(wallet: string, metadataUri: string): Promise<string> {
    try {
      this.logger.log(`Minting NFT for wallet: ${wallet}, metadata URI: ${metadataUri}`);
      const walletPublicKey = new PublicKey(wallet);

      // Call Metaplex to create the NFT
      const { nft } = await this.metaplex.nfts().create({
        uri: metadataUri,
        name: 'My NFT',
        sellerFeeBasisPoints: 500,  // Example: 5% royalty
        creators: [{ address: walletPublicKey, share: 100 }],
      });

      this.logger.log(`NFT minted successfully: ${nft.address.toString()}`);
      return nft.address.toString();
    } catch (error) {
      this.logger.error(`Failed to mint NFT: ${error.message}`);
      throw new Error(`Minting failed: ${error.message}`);
    }
  }

  // Get all NFTs for a specific wallet
  async getNftsByWallet(walletAddress: string): Promise<any[]> {
    try {
      this.logger.log(`Fetching NFTs for wallet: ${walletAddress}`);
      const walletPublicKey = new PublicKey(walletAddress);

      const nfts = await this.metaplex.nfts().findAllByOwner({ owner: walletPublicKey });
      this.logger.log(`Found ${nfts.length} NFTs for wallet: ${walletAddress}`);
      return nfts;
    } catch (error) {
      this.logger.error(`Failed to fetch NFTs: ${error.message}`);
      throw new Error(`Failed to fetch NFTs: ${error.message}`);
    }
  }

  // Get NFT details by mint address
  async getNftDetails(mintAddress: string): Promise<any> {
    try {
      this.logger.log(`Fetching NFT details for mint address: ${mintAddress}`);
      const mintPublicKey = new PublicKey(mintAddress);

      const nft = await this.metaplex.nfts().findByMint({ mint: mintPublicKey });
      if (!nft) {
        this.logger.warn(`No NFT found for mint address: ${mintAddress}`);
        throw new Error('NFT not found');
      }

      this.logger.log(`NFT details fetched for mint address: ${mintAddress}`);
      return nft;
    } catch (error) {
      this.logger.error(`Failed to fetch NFT details: ${error.message}`);
      throw new Error(`Failed to fetch NFT details: ${error.message}`);
    }
  }
}
