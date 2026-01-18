import { Injectable } from '@nestjs/common';
import { EmailAddressService } from 'src/emailAddress/emailAddress.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateClientDto } from './dto/create-client.dto';

@Injectable()
export class ClientService {
  constructor(
    private prisma: PrismaService,
    private emailService: EmailAddressService,
  ) {}

  async createClient(userId: string, clientDto: CreateClientDto) {
    const { name, phone, emailAddresses } = clientDto;
    const client = await this.prisma.client.create({
      data: {
        name,
        phone,
        userId,
      },
    });

    // Add email addresses
    for (const emailDto of emailAddresses) {
      await this.emailService.addEmail(
        client.id,
        'CLIENT',
        emailDto.email,
        emailDto.isPrimary,
      );
    }

    return client;
  }
}
