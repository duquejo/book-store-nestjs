import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthRepository } from './auth.repository';
import { SignupDto } from './dto/signup.dto';
import { SigninDto } from './dto/signin.dto';
import { compare } from 'bcryptjs';
import { IJwtPayload } from './jwt-payload.interface';
import { RoleType } from '../role/roleType.enum';
import { User } from '../user/user.entity';
import { plainToClass } from 'class-transformer';
import { LoggedInDto } from './dto/logged-in.dto';

@Injectable()
export class AuthService {

    constructor( 
        @InjectRepository(AuthRepository)
        private readonly _authRepository: AuthRepository,
        private readonly _jwtService: JwtService
    ) {}

    async signup( signupDto: SignupDto ): Promise<void> {
        const { username, email } = signupDto;
        // Check if user exists by username/email
        const userExists = await this._authRepository.findOne({
            where: [{ username }, { email }]
        });
        if( userExists ) throw new ConflictException('Username or Email already exists');
        return this._authRepository.signup( signupDto );
    }

    async singin( signinDto: SigninDto ): Promise<LoggedInDto>{
        const { username, password } = signinDto;
        
        /**
         * Check if exist
         */
        const user: User = await this._authRepository.findOne({
            where: { username }
        });
        if( ! user ) throw new NotFoundException('User doesn\'t exist');

        /**
         * Compare password
         */
        const isMatch = await compare( password, user.password );
        if( ! isMatch ) throw new UnauthorizedException('Invalid credentials');

        /**
         * JWT Interface
         */
        const payload: IJwtPayload = {
            id: user.id,
            email: user.email,
            username: user.username,
            roles: user.roles.map( role => role.name as RoleType ) // Explicit RoleType def
        };

        const token = this._jwtService.sign( payload );
        return plainToClass( LoggedInDto, { token, user });
    }
}