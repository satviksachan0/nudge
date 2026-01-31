import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from 'src/auth/jwt/jwt.guard';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { InvoicesService } from './invoices.service';

@UseGuards(JwtGuard)
@Controller('invoices')
export class InvoicesController {
  constructor(private invoicesService: InvoicesService) {}

  @Post()
  create(@Req() req: any, @Body() dto: CreateInvoiceDto) {
    return this.invoicesService.create(req.accountId, dto);
  }

  @Get()
  findAll(@Req() req: any) {
    return this.invoicesService.findAll(req.accountId);
  }

  @Get(':id')
  findOne(@Req() req: any, @Param('id') invoiceId: string) {
    return this.invoicesService.findOne(req.accountId, invoiceId);
  }

  @Patch(':id/mark-paid')
  markAsPaid(@Req() req: any, @Param('id') invoiceId: string) {
    return this.invoicesService.markAsPaid(req.accountId, invoiceId);
  }
}
