import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class EmailService {
  constructor(private prisma: PrismaService) {}

  async findAllEmails(ownerId: string, ownerType: 'USER' | 'CLIENT') {
    return this.prisma.emailAddress.findMany({
      where: {
        ownerId,
        ownerType,
      },
    });
  }

  async findPrimaryEmail(ownerId: string, ownerType: 'USER' | 'CLIENT') {
    return this.prisma.emailAddress.findFirst({
      where: {
        ownerId,
        ownerType,
        isPrimary: true,
      },
    });
  }

  async addEmail(
    ownerId: string,
    ownerType: 'USER' | 'CLIENT',
    email: string,
    isPrimary = false,
  ) {
    if (isPrimary) {
      // Set existing primary emails to false
      await this.prisma.emailAddress.updateMany({
        where: {
          ownerId,
          ownerType,
          isPrimary: true,
        },
        data: {
          isPrimary: false,
        },
      });
    }

    return this.prisma.emailAddress.create({
      data: {
        ownerId,
        ownerType,
        email,
        isPrimary,
      },
    });
  }
}
