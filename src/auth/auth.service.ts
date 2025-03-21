import {
  BadRequestException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RegisterAuthDto } from './dto/register.dto';
import { LoginAuthDto } from './dto/login.dto';
import { UsersEntity } from './entities/auth.entity';
import { Repository } from 'typeorm';
import { BcryptEncryption } from 'src/utils/bcrypt/bcrypt';
import { CustomJwtService } from 'src/utils/jwt/jwt.service';
import { config } from 'src/config/config';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly userRepo: Repository<UsersEntity>,
    private readonly jwtService: CustomJwtService,
  ) {}
  async registerUser(registerAuthDto: RegisterAuthDto) {
    const hashedPass = await BcryptEncryption.encrypt(registerAuthDto.password);
    const newUser = this.userRepo.create({
      ...registerAuthDto,
      password: hashedPass,
    });
    const savedUser = await this.userRepo.save(newUser);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Registration successfull',
      data: savedUser,
    };
  }

  async loginUser(loginAuthDto: LoginAuthDto) {
    const user = await this.userRepo.findOne({
      where: { email: loginAuthDto.email },
    });
    if (!user) {
      throw new BadRequestException('Invalid email');
    }
    const isPasswordEqual = await BcryptEncryption.compare(
      loginAuthDto.password,
      user.password,
    );
    if (!isPasswordEqual) {
      throw new BadRequestException('Invalid password');
    }
    const payload = { sub: user.fullname, id: user.id, role: user.role };
    const accessToken = await this.jwtService.generateAccessToken(payload);
    const refreshToken = await this.jwtService.generateRefreshToken(payload);
    return {
      statusCode: HttpStatus.OK,
      message: 'Login was successfull',
      data: {
        accessToken: accessToken,
        accessTokenExpire: config.ACCESS_TOKEN_TIME,
        refreshToken: refreshToken,
        refreshTokenExpire: config.REFRESH_TOKEN_TIME,
      },
    };
  }
  async refreshToken(refreshToken: string) {
    const data = await this.jwtService.verifyRefreshToken(refreshToken);
    const user = await this.userRepo.findOne({ where: { id: data?.id } });
    const payload = { sub: user?.fullname, id: user?.id, role: user?.role };
    const newAccessToken = await this.jwtService.generateAccessToken(payload);
    return {
      statusCode: HttpStatus.OK,
      message: 'Access token refreshed successfully',
      data: {
        accessToken: newAccessToken,
        accessTokenExpire: config.ACCESS_TOKEN_TIME,
      },
    };
  }
  async getProfile(id: string) {
    const user = await this.userRepo.findOne({
      where: { id },
      select: {
        fullname: true,
        phone_number: true,
        email: true,
        address: true,
        avatar: true,
      },
    });
    return {
      statusCode: HttpStatus.OK,
      message: 'User Profile Data Fetched Successfully',
      data: {
        ...user,
      },
    };
  }
}
