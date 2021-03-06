import { injectable, inject } from 'tsyringe';

import ResourceNotFoundException from '~/exceptions/ResourceNotFoundException';
import IUseCase from '~/types/IUseCase';

import User from '@users/entities/User';
import IUserCacheProvider from '@users/providers/UserCacheProvider/IUserCacheProvider';
import IUserRepository from '@users/repositories/UserRepository/IUserRepository';

import ShowCurrentUserDTO from './ShowCurrentUserDTO';

@injectable()
export default class ShowCurrentUserUseCase implements IUseCase {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,

    @inject('UserCacheProvider')
    private userCacheProvider: IUserCacheProvider,
  ) {}

  async execute({ id }: ShowCurrentUserDTO): Promise<User> {
    const user = await this.userRepository.findById(id);

    if (!user) throw new ResourceNotFoundException('User');

    await this.userCacheProvider.save(user);

    return user;
  }
}
