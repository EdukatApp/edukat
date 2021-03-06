import User from '@users/entities/User';

import IUserCacheProvider from '../../IUserCacheProvider';

export default class FakeUserCacheProvider implements IUserCacheProvider {
  private users = new Map<string, User>();

  async save(user: User): Promise<void> {
    this.users.set(user.id, user);
  }

  async exists(id: string): Promise<boolean> {
    return this.users.has(id);
  }

  async recover(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async invalidate(id: string): Promise<void> {
    this.users.delete(id);
  }

  async invalidateAll(): Promise<void> {
    const keys = this.users.keys();

    Array.from(keys).forEach((key) => this.users.delete(key));
  }
}
