import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    super({
      // Extract JWT from the Authorization header as a Bearer token
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // Ignore expired tokens - set to false to reject expired tokens
      ignoreExpiration: false,
      // Use the JWT secret from the environment variables
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  // Validate function to process the JWT payload after successful decoding
  async validate(payload: any) {
    // Here, the payload contains information from the token (e.g., userId, username)
    return { userId: payload.sub, username: payload.username };
  }
}
