import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class GatewayMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // Add authentication and validation logic here
    if (!req.headers.authorization) {
      return res.status(401).send('Unauthorized');
    }
    next();
  }
}
