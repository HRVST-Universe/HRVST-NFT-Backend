import { Injectable } from '@nestjs/common';
import { umi } from '@metaplex-foundation/js';

@Injectable()
export class NftService {
  async mintNft(wallet: string, metadataUri: string): Promise<string> {
    const umiInstance = umi(); // Initialize Umi SDK
    const nft = await umiInstance.mint({
      uri: metadataUri,
      walletAddress: wallet,
    });
    return nft.publicKey.toString();
  }
}
