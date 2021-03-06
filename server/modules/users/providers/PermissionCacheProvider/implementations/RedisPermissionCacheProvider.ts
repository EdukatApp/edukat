import cacheConfig from '~/config/cache';
import redis from '~/infra/redis';

import IPermissionCacheProvider from '../IPermissionCacheProvider';

export default class RedisPermissionCacheProvider implements IPermissionCacheProvider {
  private prefix = 'permissions';

  private addPrefix(suffix: string): string {
    return `${this.prefix}:${suffix}`;
  }

  async save(id: string, permissions: string): Promise<void> {
    const key = this.addPrefix(id);

    await redis.setex(key, cacheConfig.expirationTime, permissions);
  }

  async exists(id: string): Promise<boolean> {
    const exists = await redis.exists(this.addPrefix(id));

    return Boolean(exists);
  }

  async recover(id: string): Promise<string | undefined> {
    const value = await redis.get(this.addPrefix(id));

    if (!value) return undefined;

    return value;
  }

  async invalidate(id: string): Promise<void> {
    await redis.del(this.addPrefix(id));
  }

  async invalidateAll(): Promise<void> {
    const keys = await redis.keys(this.addPrefix('*'));

    const pipeline = redis.pipeline();

    keys.forEach((key) => pipeline.del(key));

    const [error] = await pipeline.exec();

    // eslint-disable-next-line @typescript-eslint/no-throw-literal
    if (error) throw error;
  }
}
