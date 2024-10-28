import { Module } from '@nestjs/common';
import { ArweaveService } from './arweave.service';

@Module({
  providers: [ArweaveService],
})
export class ArweaveModule {}
