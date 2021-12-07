import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { UserService } from './user.service';
import { User } from './user.entity';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../role/decorators/role.decorator';
import { RoleGuard } from '../role/guards/role.guard';
import { RoleType } from '../role/roleType.enum';

@Controller('users')
// @UseGuards( AuthGuard() ) // You could set it globally, for guard all UserController routes
export class UserController {
    constructor( private readonly _userService: UserService ) {}

    @Get(':id')
    // @Roles( RoleType.ADMINISTRATOR ) // Custom decorator witch returns roles array
    // @UseGuards( AuthGuard(), RoleGuard ) // Custom guard witch verifies if the user has the defined decorator roles 
    async getUser( @Param('id', ParseIntPipe ) id: number ): Promise<User> {
        const user = await this._userService.get( id );
        return user;
    }

    @UseGuards( AuthGuard() ) // You could use directly in endpoint
    @Get()
    async getUsers(): Promise<User[]> {
        const users = await this._userService.getAll();
        return users;
    }

    @Post()
    async createUser( @Body() user: User ): Promise<User> {
        const createdUser = await this._userService.create( user );
        return createdUser;
    }

    @Patch(':id')
    async updateUser( @Param('id', ParseIntPipe ) id: number, @Body() user: User ) {
        const updatedUser = await this._userService.update( id, user );
        return true;
    }

    @Delete(':id')
    async deleteUser( @Param('id', ParseIntPipe ) id: number ) {
        await this._userService.delete( id );
        return true;
    }

    @Post('setRole/:userId/:roleId')
    async setRoleToUser( 
        @Param('userId', ParseIntPipe ) userId: number,
        @Param('roleId', ParseIntPipe ) roleId: number,
    ) {
        return this._userService.setRoleToUser( userId, roleId );
    }
}