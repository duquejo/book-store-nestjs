import { Controller, Post, Body, UsePipes, ValidationPipe } from '@nestjs/common';
import { SignupDto } from './dto/signup.dto';
import { AuthService } from './auth.service';
import { SigninDto } from './dto/signin.dto';
import { LoggedInDto } from './dto';

@Controller('auth')
export class AuthController {

    constructor( private readonly _authService: AuthService ) {}
    
    @Post('/signup')
    @UsePipes( ValidationPipe ) // Verify the class-validator custom validations are fine.
    signup( @Body() signupDto: SignupDto ): Promise<void> {
        return this._authService.signup( signupDto );
    }

    @Post('/signin')
    @UsePipes( ValidationPipe )
    signin( @Body() signinDto: SigninDto ): Promise<LoggedInDto> {
        return this._authService.singin( signinDto );
    }
}
