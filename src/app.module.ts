import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { NftModule } from './nft/nft.module';
import { ArweaveModule } from './arweave/arweave.module';
import { GatewayMiddleware } from './gateway/gateway.middleware';

@Module({
  imports: [AuthModule, NftModule, ArweaveModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(GatewayMiddleware).forRoutes('*');
  }
}
