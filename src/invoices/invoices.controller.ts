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
import { Request } from 'express';
import { JwtGuard } from 'src/auth/jwt/jwt.guard';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { InvoicesService } from './invoices.service';

@UseGuards(JwtGuard)
@Controller('invoices')
export class InvoicesController {
  constructor(private invoicesService: InvoicesService) {}

  @Post()
  create(@Req() req: Request, @Body() dto: CreateInvoiceDto) {
    return this.invoicesService.create(req.accountId, dto);
  }

  @Get()
  findAll(@Req() req: Request) {
    return this.invoicesService.findAll(req.accountId);
  }

  @Get(':id')
  findOne(@Req() req: Request, @Param('id') invoiceId: string) {
    return this.invoicesService.findOne(req.accountId, invoiceId);
  }

  @Patch(':id/mark-paid')
  markAsPaid(@Req() req: Request, @Param('id') invoiceId: string) {
    return this.invoicesService.markAsPaid(req.accountId, invoiceId);
  }
}
