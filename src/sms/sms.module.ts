import { Module } from '@nestjs/common';
import { SmsService } from './sms.service';
import { SmsController } from './sms.controller';
import { HttpModule } from '@nestjs/axios';
// import { RedisRepository } from 'src/shared/common-utils/repository/redis.repository';
// import { redisClientFactory } from 'src/shared/config/redis.config';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [HttpModule, ConfigModule],
  controllers: [SmsController],
  providers: [SmsService],
})
export class SmsModule {}
