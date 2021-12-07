import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { UserService } from './user.service';
import { User } from './user.entity';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../role/decorators/role.decorator';
import { RoleGuard } from '../role/guards/role.guard';
import { RoleType } from '../role/roleType.enum';
import { ReadUserDto } from './dto/read-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
// @UseGuards( AuthGuard() ) // You could set it globally, for guard all UserController routes
export class UserController {
    constructor( private readonly _userService: UserService ) {}

    @Get(':id')
    // @Roles( RoleType.ADMINISTRATOR ) // Custom decorator witch returns roles array
    // @UseGuards( AuthGuard(), RoleGuard ) // Custom guard witch verifies if the user has the defined decorator roles 
    getUser( @Param('id', ParseIntPipe ) userId: number ): Promise<ReadUserDto> {
        return this._userService.get( userId );
    }

    @UseGuards( AuthGuard() ) // You could use directly in endpoint
    @Get()
    getUsers(): Promise<ReadUserDto[]> {
        return this._userService.getAll();
    }

    @Patch(':userId')
    updateUser( @Param('userId', ParseIntPipe ) userId: number, @Body() user: UpdateUserDto ) {
        return this._userService.update( userId, user );
    }

    @Delete(':userid')
    deleteUser( @Param('userid', ParseIntPipe ) userid: number ): Promise<void> {
        return this._userService.delete( userid );
    }

    @Post('setRole/:userId/:roleId')
    setRoleToUser( 
        @Param('userId', ParseIntPipe ) userId: number,
        @Param('roleId', ParseIntPipe ) roleId: number,
    ): Promise<boolean> {
        return this._userService.setRoleToUser( userId, roleId );
    }
}