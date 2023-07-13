import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: Repository<User>) {}

  create(createUserDto: CreateUserDto) {
    try {
      const user = this.usersRepository.create(createUserDto);
      if (!user) {
        throw new HttpException(
          'Не удалось создать пользователя',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
      return user;
    } catch (error) {
      throw new HttpException(
        'Не удалось создать пользователя',
        HttpStatus.INTERNAL_SERVER_ERROR,
        { cause: error },
      );
    }
  }

  findAll() {
    try {
      const users = this.usersRepository.find();
      if (!users) {
        throw new HttpException(
          'Не удалось получить пользователей',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
      return users;
    } catch (error) {
      throw new HttpException(
        'Не удалось получить пользователей',
        HttpStatus.INTERNAL_SERVER_ERROR,
        { cause: error },
      );
    }
  }

  findOne(id: string) {
    try {
      const user = this.usersRepository.findOneBy({ id });
      if (!user) {
        throw new HttpException(
          'Не удалось получить пользователя',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
      return user;
    } catch (error) {
      throw new HttpException(
        'Не удалось получить пользователя',
        HttpStatus.INTERNAL_SERVER_ERROR,
        { cause: error },
      );
    }
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  getByEmail(email: string) {
    try {
      const user = this.usersRepository.findOneBy({ email });
      if (!user) {
        throw new HttpException(
          'Не удалось получить пользователя',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
      return user;
    } catch (error) {
      throw new HttpException(
        'Не удалось получить пользователя',
        HttpStatus.INTERNAL_SERVER_ERROR,
        { cause: error },
      );
    }
  }
}
