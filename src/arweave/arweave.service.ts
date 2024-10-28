import { Injectable } from '@nestjs/common';
import Arweave from 'arweave';

@Injectable()
export class ArweaveService {
  private arweave = Arweave.init({
    host: 'arweave.net',
    port: 443,
    protocol: 'https',
  });

  async uploadFile(data: Buffer): Promise<string> {
    const transaction = await this.arweave.createTransaction({ data });
    await this.arweave.transactions.sign(transaction);
    await this.arweave.transactions.post(transaction);
    return transaction.id;
  }
}
