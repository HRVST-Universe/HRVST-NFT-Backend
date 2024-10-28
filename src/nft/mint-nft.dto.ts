import { IsString, IsNotEmpty } from 'class-validator';

// Data Transfer Object for minting NFTs
export class MintNftDto {
  @IsString()
  @IsNotEmpty()
  wallet!: string;

  @IsString()
  @IsNotEmpty()
  metadataUri!: string;
}
