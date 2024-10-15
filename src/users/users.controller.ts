import { Body, Controller, Get, Param, Patch, Post, Delete, Query, UseGuards} from '@nestjs/common';
import { UsersService } from './users.service'
import { AuthGuard} from '../auth/auth.guard'

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}
    @Get()
    getAllUsers(@Query('role') role?: 'admin' | 'user') {
        return this.usersService.getAllUsers(role);
    }


    @Get(':id')
    getUserById(@Param('id') id: string) {
        return this.usersService.getUserById(id);
    }

    @Post()
    createUser(@Body() user: any) {
        return this.usersService.createUser(user);
    }

    @UseGuards(AuthGuard) 
    @Patch(':id')
    updateUser(@Param('id') id: string, @Body() userUpdate: {}) {
        return this.usersService.updateUser(id,userUpdate );
    }

    @UseGuards(AuthGuard) 
    @Delete(':id')
    deleteUser(@Param('id') id: string) {
        return this.usersService.deleteUser(id)
    }
}
