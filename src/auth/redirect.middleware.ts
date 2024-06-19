import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class RedirectMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    if (req.query.redirectUrl) {
      (req.session as any).redirectUrl = req.query.redirectUrl;
    }
    next();
  }
}
