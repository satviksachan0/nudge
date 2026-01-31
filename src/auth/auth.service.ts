import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { PrismaService } from '../prisma/prisma.service';
import { SignupDto } from './dto/signup.dto';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async signup(dto: SignupDto) {
    const hashed = await bcrypt.hash(dto.password, 10);

    return this.prisma.$transaction(async (tx) => {
      const account = await tx.account.create({
        data: {
          name: dto.accountName,
        },
      });

      const user = await tx.user.create({
        data: {
          name: dto.name,
          email: dto.email,
          password: hashed,
          accountId: account.id,
        },
      });

      const secretKey = process.env.JWT_SECRET as jwt.Secret;
      const expiresIn = process.env
        .JWT_EXPIRES_IN as jwt.SignOptions['expiresIn'];

      const token = jwt.sign(
        {
          userId: user.id,
          accountId: account.id,
        },
        secretKey,
        { expiresIn },
      );

      return token;
    });
  }

  async login(email: string, password: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) throw new UnauthorizedException('Invalid credentials');

    const secretKey = process.env.JWT_SECRET as jwt.Secret;
    const expiresIn = process.env
      .JWT_EXPIRES_IN as jwt.SignOptions['expiresIn'];

    const token = jwt.sign(
      {
        userId: user.id,
        accountId: user.accountId,
      },
      secretKey,
      { expiresIn },
    );

    return token;
  }

  async me(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        name: true,
        accountId: true,
      },
    });

    return user;
  }
}
