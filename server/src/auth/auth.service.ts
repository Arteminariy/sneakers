import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';
import { AuthDto } from './dto/';
import * as bcrypt from 'bcrypt';
import { LogoutResponse, Tokens } from './interfaces';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    private userRepository: Repository<User>,
    private userService: UsersService,
    private JWTService: JwtService,
  ) {}

  async signUpLocal(authDto: AuthDto): Promise<Tokens | HttpException> {
    try {
      const candidate = await this.userService.getByEmail(authDto.email);
      if (candidate) {
        return new HttpException(
          'Пользователь с таким email уже существует',
          HttpStatus.BAD_REQUEST,
        );
      }
      const hashedPassword = await this.hashData(authDto.password);
      const newUser = await this.userService.create({
        ...authDto,
        password: hashedPassword,
      });
      if (newUser instanceof HttpException) {
        return new HttpException(
          'Не удалось создать пользователя',
          HttpStatus.UNAUTHORIZED,
        );
      }
      if (newUser instanceof User) {
        // await this.mailService.sendActivationMail(authDto.email, newUser.id);
        const tokens = await this.getTokens(newUser.id, newUser.email);
        await this.updateRTHash(newUser.id, tokens.refreshToken);
        return tokens;
      }
    } catch (error) {
      return new HttpException(
        'Ошибка при регистрации',
        HttpStatus.INTERNAL_SERVER_ERROR,
        { cause: error },
      );
    }
  }

  async signInLocal(authDto: AuthDto): Promise<Tokens | HttpException> {
    try {
      const user = await this.userService.getByEmail(authDto.email);
      console.log(user);

      if (!user) {
        return new HttpException(
          'Пользователь не найден',
          HttpStatus.NOT_FOUND,
        );
      }
      const passwordMatches = await bcrypt.compare(
        authDto.password,
        user.password,
      );
      console.log(passwordMatches);

      if (!passwordMatches) {
        return new HttpException(
          'Указан неверный пароль',
          HttpStatus.UNAUTHORIZED,
        );
      }

      const tokens = await this.getTokens(user.id, user.email);
      console.log(tokens);

      await this.updateRTHash(user.id, tokens.refreshToken);
      return tokens;
    } catch (error) {
      return new HttpException(
        'Ошибка при входе',
        HttpStatus.INTERNAL_SERVER_ERROR,
        { cause: error },
      );
    }
  }

  async logout(userId: string): Promise<LogoutResponse | HttpException> {
    try {
      const user = await this.userRepository.findOneBy({ id: userId });
      if (!user) {
        return new HttpException(
          'Пользователь не найден',
          HttpStatus.NOT_FOUND,
        );
      }
      await this.userRepository.save(user);
      return { message: 'Выход из системы совершён успешно' };
    } catch (error) {
      return new HttpException(
        'Ошибка при выходе из системы',
        HttpStatus.INTERNAL_SERVER_ERROR,
        { cause: error },
      );
    }
  }

  async refreshTokens(
    userId: string,
    rt: string,
  ): Promise<Tokens | HttpException> {
    try {
      const user = await this.userRepository.findOneBy({ id: userId });
      if (!user || !user.hashedRT) {
        return new HttpException(
          'Пользователь не найден',
          HttpStatus.NOT_FOUND,
        );
      }
      const rtMatches = bcrypt.compare(rt, user.hashedRT);
      if (!rtMatches) {
        return new HttpException(
          'Указан неверный Refresh Token',
          HttpStatus.UNAUTHORIZED,
        );
      }
      const tokens = await this.getTokens(user.id, user.email);
      await this.updateRTHash(user.id, tokens.refreshToken);
      return tokens;
    } catch (error) {
      return new HttpException(
        'Ошибка при получении токенов',
        HttpStatus.INTERNAL_SERVER_ERROR,
        { cause: error },
      );
    }
  }

  async hashData(data: string): Promise<string> {
    return await bcrypt.hash(data, 10);
  }

  async updateRTHash(userId: string, rt: string): Promise<void> {
    const hash = await this.hashData(rt);
    const user = await this.userRepository.findOneBy({ id: userId });
    await this.userRepository.save({ ...user, hashedRT: hash });
  }

  async getTokens(userId: string, email: string): Promise<Tokens> {
    const [at, rt] = await Promise.all([
      this.JWTService.signAsync(
        {
          sub: userId,
          email,
        },
        {
          expiresIn: '15m',
          secret: process.env.JWT_ACCESS_KEY,
        },
      ),
      this.JWTService.signAsync(
        {
          sub: userId,
          email,
        },
        {
          expiresIn: '7d',
          secret: process.env.JWT_REFRESH_KEY,
        },
      ),
    ]);
    return {
      accessToken: at,
      refreshToken: rt,
    };
  }
}
