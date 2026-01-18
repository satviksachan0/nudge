import {
  Controller,
  Req,
  Body,
  Post,
  Param,
  Get,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { InvoicesService } from './invoices.service';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { JwtGuard } from 'src/auth/jwt/jwt.guard';

@UseGuards(JwtGuard)
@Controller('invoices')
export class InvoicesController {
  constructor(private invoicesService: InvoicesService) {}

  @Post()
  create(@Req() req: any, @Body() dto: CreateInvoiceDto) {
    return this.invoicesService.create(req.user.userId, dto);
  }

  @Get()
  findAll(@Req() req: any) {
    return this.invoicesService.findAll(req.user.userId);
  }

  @Get(':id')
  findOne(@Req() req: any, @Param('id') invoiceId: string) {
    return this.invoicesService.findOne(req.user.userId, invoiceId);
  }

  @Patch(':id/mark-paid')
  markAsPaid(@Req() req: any, @Param('id') invoiceId: string) {
    return this.invoicesService.markAsPaid(req.user.userId, invoiceId);
  }
}
