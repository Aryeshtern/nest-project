import { Injectable ,UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {

    constructor(private readonly UsersService: UsersService, private JwtService: JwtService) { }
    
    async login(username: string, password: string) {
        const user = await this.UsersService.getUserByUsername(username);
        if (!user || user.password !== password) {
          throw new UnauthorizedException();
        }
    
        const payload = { username: user.name, sub: user.id };
        return this.JwtService.sign(payload);
      }

}
