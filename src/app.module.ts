import { Module } from '@nestjs/common';
import { NftModule } from './nft/nft.module';  // Import other modules as needed

@Module({
  imports: [NftModule],  // Add other modules here
})
export class AppModule {}
