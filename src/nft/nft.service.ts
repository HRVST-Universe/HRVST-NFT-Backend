import { Injectable } from '@nestjs/common';
import { Metaplex, keypairIdentity, bundlrStorage } from '@metaplex-foundation/js';
import { Connection, PublicKey, clusterApiUrl, Keypair } from '@solana/web3.js';

@Injectable()
export class NftService {
  private connection = new Connection(clusterApiUrl('devnet')); // Use 'mainnet-beta' for production
  private metaplex = Metaplex.make(this.connection)
    .use(keypairIdentity(Keypair.generate())) // Replace with actual wallet keypair
    .use(bundlrStorage());

  // Mint a new NFT
  async mintNft(wallet: string, metadataUri: string): Promise<string> {
    const walletPublicKey = new PublicKey(wallet);
    const { nft } = await this.metaplex.nfts().create({
      uri: metadataUri,
      name: 'My NFT',
      sellerFeeBasisPoints: 500, // 5% royalty
      creators: [{ address: walletPublicKey, share: 100 }],
    });
    return nft.address.toString();
  }

  // Get all NFTs for a wallet
  async getNftsByWallet(walletAddress: string): Promise<any[]> {
    const walletPublicKey = new PublicKey(walletAddress);
    const nfts = await this.metaplex.nfts().findAllByOwner({ owner: walletPublicKey });
    return nfts;
  }

  // Get details of a specific NFT by its mint address
  async getNftDetails(mintAddress: string): Promise<any> {
    const nftPublicKey = new PublicKey(mintAddress);
    const nft = await this.metaplex.nfts().findByMint({ mint: nftPublicKey });
    return nft;
  }
}
