import { Controller, Get, Post, Delete, Body, Param, BadRequestException } from '@nestjs/common';
import { GuestbookService } from './guestbook.service';

@Controller('guestbook')
export class GuestbookController {
  constructor(private readonly guestbookService: GuestbookService) {}

  @Get()
  async findAll() {
    return await this.guestbookService.getAllEntries();
  }

  @Post()
  async create(@Body() body: { name: string; message: string }) {
    return await this.guestbookService.createEntry(body.name, body.message);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.guestbookService.deleteEntry(id);
  }
}