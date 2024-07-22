// redis.config.ts
import { FactoryProvider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Redis } from 'ioredis';

// interface RedisConfig {
//   host: string;
//   port: number;
//   password?: string;
// }

// export const redisConfig: RedisConfig = {
//   host: process.env.REDIS_HOST || 'localhost',
//   port: parseInt(process.env.REDIS_PORT, 10) || 6379,
//   password: process.env.REDIS_PASSWORD,
// };

// export const redisClientFactory: FactoryProvider<Redis> = {
export const redisClientFactory: FactoryProvider<any> = {
  provide: 'RedisClient',
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => {
    // const redisInstance = new Redis({
    //   host: configService.get('cache.host'),
    //   port: configService.get('cache.port'),
    //   password: configService.get('cache.password'),
    //   username: configService.get('cache.user'),
    //   db: configService.get('cache.db'),
    // });
    // redisInstance.on('error', (e) => {
    //   throw new Error(`Redis connection failed: ${e}`);
    // });
    // return redisInstance;
  },
};
