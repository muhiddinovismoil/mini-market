import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterAuthDto } from './dto/register.dto';
import { LoginAuthDto } from './dto/login.dto';
import { JwtGuard } from 'src/utils/guard/auth.guard';
import { UserID } from 'src/utils/decorator/userId.decorator';

@Controller('users')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('/signup')
  register(@Body() registerAuthDto: RegisterAuthDto) {
    return this.authService.registerUser(registerAuthDto);
  }

  @Post('/signin')
  login(@Body() loginAuthDto: LoginAuthDto) {
    return this.authService.loginUser(loginAuthDto);
  }

  @UseGuards(JwtGuard)
  @Get('/profile')
  getProfileData(@UserID('id') id: string) {
    return this.authService.getProfile(id);
  }

  @UseGuards(JwtGuard)
  @Get('/refresh-token')
  refreshToken(@Body('refreshToken') refreshToken: string) {
    return this.authService.refreshToken(refreshToken);
  }
}
