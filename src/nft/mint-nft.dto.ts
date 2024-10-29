import { IsString, IsNotEmpty } from 'class-validator';

export class MintNftDto {
  @IsString()
  @IsNotEmpty()
  wallet!: string;

  @IsString()
  @IsNotEmpty()
  metadataUri!: string;
}
