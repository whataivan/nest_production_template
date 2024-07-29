import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { IdDto } from '../../core/dto/id.dto';
import {CreateUser}

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(dto: CreateUserDto) {
    return await this.userRepository.findOne(dto);
  }

  async findOne(idDto: IdDto) {
    return await this.userRepository.findOne(idDto);
  }
}
