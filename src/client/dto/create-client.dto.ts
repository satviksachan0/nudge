class ClientEmailDto {
  email: string;
  isPrimary: boolean;
}
export class CreateClientDto {
  name: string;
  phone: string;
  emailAddresses: ClientEmailDto[];
}
