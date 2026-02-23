import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SupabaseService } from './supabase/supabase.service';
import { GuestbookController } from './guestbook/guestbook.controller';

@Module({
  imports: [ConfigModule.forRoot()], // This line allows the .env to work
  controllers: [AppController, GuestbookController],
  providers: [AppService, SupabaseService],
})
export class AppModule {}