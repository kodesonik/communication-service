import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WhatsappModule } from './whatsapp/whatsapp.module';
import { SmsModule } from './sms/sms.module';
import { MailModule } from './mail/mail.module';
import { NotificationModule } from './notification/notification.module';
import { SlackModule } from './slack/slack.module';
import { ConfigModule } from '@nestjs/config';
import configuration from './shared/config/configuration';
// import { RedisModule } from '@nestjs-modules/ioredis';
import { ScheduleModule } from '@nestjs/schedule';
import { redisClientFactory } from './shared/config/redis.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
    // RedisModule.forRoot({
    //   type: 'single',
    //   url: `redis://${configuration().cache.host}:${configuration().cache.port}`, // ou l'adresse de votre serveur Redis
    // }),
    WhatsappModule,
    SmsModule,
    MailModule,
    NotificationModule,
    SlackModule,
    ScheduleModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [redisClientFactory, AppService],
})
export class AppModule {}
