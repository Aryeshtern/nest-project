import { Controller, Post, Body, Res  } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) {}

    @Post('login')
    async login(@Body() body: { username: string; password: string }, @Res() response: Response) {
        const token = await this.authService.login(body.username, body.password);
        
        response.cookie('jwt', token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production', 
          maxAge: 3600000,
        });
    
        return response.send({ message: 'Login successful' });
      }
    

}
