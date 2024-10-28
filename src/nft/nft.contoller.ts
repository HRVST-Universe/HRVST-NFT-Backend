import { Controller, Post, Get, Body, Param, HttpException, HttpStatus } from '@nestjs/common';
import { NftService } from './nft.service';

  @Controller('nft')
  export class NftController {
    constructor(private readonly nftService: NftService) {}

    // Route for fetching details of a specific NFT by its mint address
    @Get(':mintAddress')
    async getNftByMintAddress(@Param('mintAddress') mintAddress: string) {
      const nft = await this.nftService.getNftDetails(mintAddress);
      return { message: 'NFT details fetched successfully', nft };
    }
  }

  // Mint a new NFT
  @Post('mint')
  async mintNft(@Body() body: { wallet: string; metadataUri: string }) {
    const { wallet, metadataUri } = body;
    try {
      const nft = await this.nftService.mintNft(wallet, metadataUri);
      return { message: 'NFT minted successfully', nft };
    } catch (error) {
      throw new HttpException('Failed to mint NFT', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // Get all minted NFTs for a wallet
  @Get(':walletAddress')
  async getNftsByWallet(@Param('walletAddress') walletAddress: string) {
    try {
      const nfts = await this.nftService.getNftsByWallet(walletAddress);
      return { walletAddress, nfts };
    } catch (error) {
      throw new HttpException('Failed to fetch NFTs', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // Fetch details of a specific NFT
  @Get('details/:mintAddress')
  async getNftDetails(@Param('mintAddress') mintAddress: string) {
    try {
      const nftDetails = await this.nftService.getNftDetails(mintAddress);
      return { nftDetails };
    } catch (error) {
      throw new HttpException('Failed to fetch NFT details', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
