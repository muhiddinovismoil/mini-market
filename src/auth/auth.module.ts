import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersEntity } from './entities/auth.entity';
import { CustomJwtModule } from 'src/utils/jwt/jwt.module';

@Module({
  imports: [TypeOrmModule.forFeature([UsersEntity]), CustomJwtModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
