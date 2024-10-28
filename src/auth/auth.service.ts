import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from './user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService
  ) {}

  async signIn(walletAddress: string): Promise<string> {
    const user = await this.userModel.findOne({ walletAddress });
    if (!user) {
      await this.userModel.create({ walletAddress });
    }
    const payload = { walletAddress };
    return this.jwtService.sign(payload);
  }
}
