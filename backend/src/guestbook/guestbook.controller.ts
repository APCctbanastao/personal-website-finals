import { Controller, Get, Post, Body } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';

@Controller('guestbook')
export class GuestbookController {
  constructor(private readonly supabaseService: SupabaseService) {}

  // This handles GET requests (reading the data)
  @Get()
  async findAll() {
    return this.supabaseService.getGuestbook();
  }

  // This handles POST requests (sending new messages)
  @Post()
  async create(@Body() body: { name: string; message: string }) {
    return this.supabaseService.addEntry(body.name, body.message);
  }
}