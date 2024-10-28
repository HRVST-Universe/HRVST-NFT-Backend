import { Controller, Get, Post, Param, Body, HttpException, HttpStatus } from '@nestjs/common';
import { NftService } from './nft.service';
import { MintNftDto } from './mint-nft.dto';

@Controller('nft')
export class NftController {
  constructor(private readonly nftService: NftService) {}

  // Endpoint to mint a new NFT
  @Post('mint')
  async mintNft(@Body() body: MintNftDto) {
    try {
      const { wallet, metadataUri } = body;
      const nftMinted = await this.nftService.mintNft(wallet, metadataUri);
      return { message: 'NFT minted successfully', nftMinted };
    } catch (error) {
      throw new HttpException(`Failed to mint NFT: ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }

  // Endpoint to get all NFTs owned by a specific wallet address
  @Get('wallet/:walletAddress')
  async getNftsByWallet(@Param('walletAddress') walletAddress: string) {
    try {
      const nfts = await this.nftService.getNftsByWallet(walletAddress);
      return { message: 'NFTs fetched successfully', nfts };
    } catch (error) {
      throw new HttpException(`Failed to fetch NFTs: ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }

  // Endpoint to get details of a specific NFT by its mint address
  @Get(':mintAddress')
  async getNftDetails(@Param('mintAddress') mintAddress: string) {
    try {
      const nft = await this.nftService.getNftDetails(mintAddress);
      return { message: 'NFT details fetched successfully', nft };
    } catch (error) {
      throw new HttpException(`Failed to fetch NFT details: ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }
}
