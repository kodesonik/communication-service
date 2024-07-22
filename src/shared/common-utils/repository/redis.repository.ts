import { Inject, Injectable, OnModuleDestroy } from '@nestjs/common';
import { Redis } from 'ioredis';

// import { RedisRepositoryInterface } from '../../../domain/interface/redis.repository.interface';

@Injectable()
export class RedisRepository implements OnModuleDestroy {
  constructor(@Inject('RedisClient') private readonly redisClient: Redis) {}

  onModuleDestroy(): void {
    this.redisClient.disconnect();
  }

  async get(prefix: string, key: string): Promise<string | null> {
    return this.redisClient.get(`${prefix}:${key}`);
  }

  async set(prefix: string, key: string, value: string): Promise<void> {
    await this.redisClient.set(`${prefix}:${key}`, value);
  }

  async delete(prefix: string, key: string): Promise<void> {
    await this.redisClient.del(`${prefix}:${key}`);
  }

  async setWithExpiry(
    prefix: string,
    key: string,
    value: string,
    expiry: number,
  ): Promise<void> {
    await this.redisClient.set(`${prefix}:${key}`, value, 'EX', expiry);
  }

  /**
   *
   * @param prefix Prefix of the list
   * @param key Key of the list
   * @param data Data to be stored in the list
   * @returns Index of the element in the list
   */
  async setInArray(prefix: string, key: string, data: any): Promise<any> {
    const l = await this.redisClient.rpush(
      `${prefix}:${key}`,
      JSON.stringify(data),
    );
    return l - 1;
  }

  async getArray(
    prefix: string,
    key: string,
    start: number = 0,
    limit: number = 0,
  ): Promise<any> {
    const res = await this.redisClient.lrange(
      `${prefix}:${key}`,
      start,
      limit - 1,
    );
    const data = res.length
      ? res.map((item, index) => ({
          id: start + index,
          data: JSON.parse(item),
        }))
      : [];
    return data;
  }

  async removeFromArray(
    prefix: string,
    key: string,
    index: number,
  ): Promise<any> {
    return await this.redisClient.lrem(`${prefix}:${key}`, index, 1);
  }

  async getArrayLength(prefix: string, key: string): Promise<number> {
    return await this.redisClient.llen(`${prefix}:${key}`);
  }

  async getArrayElement(
    prefix: string,
    key: string,
    index: number,
  ): Promise<any> {
    const data = await this.redisClient.lindex(`${prefix}:${key}`, index);
    return { id: index, data: JSON.parse(data) };
  }
}
