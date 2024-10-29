import { Controller, Get, Post, Param, Body, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { NftService } from './nft.service';
import { MintNftDto } from './mint-nft.dto';

@Controller('nft')
export class NftController {
  private readonly logger = new Logger(NftController.name);

  constructor(private readonly nftService: NftService) {}

  // Endpoint to mint a new NFT
  @Post('mint')
  async mintNft(@Body() body: MintNftDto): Promise<any> {
    this.logger.log('Received request to mint NFT with body:', body);

    try {
      // Destructure and validate the request body
      const { wallet, metadataUri } = body;

      // Log details before calling the service
      this.logger.log(`Minting NFT for wallet: ${wallet}, metadata URI: ${metadataUri}`);

      // Call the mintNft function from the service
      const nftMinted = await this.nftService.mintNft(wallet, metadataUri);

      // Check if the minting was successful
      if (!nftMinted) {
        this.logger.error('NFT minting failed. No response from the service.');
        throw new Error('NFT minting failed.');
      }

      // Log success and return response
      this.logger.log(`NFT minted successfully: ${nftMinted}`);
      return { message: 'NFT minted successfully', nftMinted };
    } catch (error) {
      this.logger.error(`Failed to mint NFT: ${error.message || 'Unknown error'}`, error.stack);
      throw new HttpException(
        `Failed to mint NFT: ${error.message || 'Unknown error'}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  // Endpoint to get all NFTs owned by a specific wallet address
  @Get('wallet/:walletAddress')
  async getNftsByWallet(@Param('walletAddress') walletAddress: string): Promise<any> {
    this.logger.log(`Received request to get NFTs for wallet: ${walletAddress}`);

    try {
      // Call the service to get NFTs by wallet address
      const nfts = await this.nftService.getNftsByWallet(walletAddress);

      // Log result
      this.logger.log(`Fetched ${nfts.length} NFTs for wallet: ${walletAddress}`);
      return { message: 'NFTs fetched successfully', nfts };
    } catch (error) {
      this.logger.error(`Failed to fetch NFTs for wallet ${walletAddress}: ${error.message || 'Unknown error'}`, error.stack);
      throw new HttpException(
        `Failed to fetch NFTs: ${error.message || 'Unknown error'}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  // Endpoint to get details of a specific NFT by its mint address
  @Get(':mintAddress')
  async getNftDetails(@Param('mintAddress') mintAddress: string): Promise<any> {
    this.logger.log(`Received request to get NFT details for mint address: ${mintAddress}`);

    try {
      // Call the service to get NFT details
      const nft = await this.nftService.getNftDetails(mintAddress);

      // Check if NFT is found
      if (!nft) {
        this.logger.warn(`No NFT found for mint address: ${mintAddress}`);
        throw new Error('NFT not found');
      }

      // Log result and return response
      this.logger.log(`Fetched NFT details for mint address: ${mintAddress}`);
      return { message: 'NFT details fetched successfully', nft };
    } catch (error) {
      this.logger.error(`Failed to fetch NFT details for mint address ${mintAddress}: ${error.message || 'Unknown error'}`, error.stack);
      throw new HttpException(
        `Failed to fetch NFT details: ${error.message || 'Unknown error'}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
