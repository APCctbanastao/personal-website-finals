import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GuestbookController } from './guestbook/guestbook.controller';
import { GuestbookService } from './guestbook/guestbook.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [GuestbookController], // Register the controller here
  providers: [GuestbookService],    // Register the service here
})
export class AppModule {}