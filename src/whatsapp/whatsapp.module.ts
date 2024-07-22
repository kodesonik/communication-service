import { Module } from '@nestjs/common';
import { WhatsappService } from './whatsapp.service';
import { WhatsappController } from './whatsapp.controller';
import WhatsApp from 'whatsapp';

@Module({
  controllers: [WhatsappController],
  providers: [
    WhatsappService,
    {
      provide: 'WHATSAPP',
      useFactory: () => {
        return new WhatsApp();
      },
    },
  ],
})
export class WhatsappModule {}
