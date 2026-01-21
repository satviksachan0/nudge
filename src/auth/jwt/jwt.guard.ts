import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { Observable } from 'rxjs';

@Injectable()
export class JwtGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();

    let token: string | undefined;

    // 1️⃣ Try cookie first (browser)
    if (req.cookies?.accessToken) {
      token = req.cookies.accessToken;
    }

    // 2️⃣ Fallback to Authorization header (Postman / API clients)
    if (!token && req.headers.authorization) {
      const [type, value] = req.headers.authorization.split(' ');
      if (type === 'Bearer') {
        token = value;
      }
    }

    if (!token) throw new UnauthorizedException('No token provided');
    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET!);
      req.user = payload;
      return true;
    } catch (err) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
