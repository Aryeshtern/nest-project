import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService, private readonly usersService: UsersService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.cookies.jwt; 

    if (!token) {
      throw new UnauthorizedException('Token not found');
    }

    try {
      const decoded = this.jwtService.verify(token); 
      const user = await this.usersService.getUserByUsername(decoded.username); 

      if (!user) {
        throw new UnauthorizedException('Invalid token');
      }

      request.user = user; 
      return true;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
