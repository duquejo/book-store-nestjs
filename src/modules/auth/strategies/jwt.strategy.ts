/**
 * 
 * Class as a service for jwt auth
 */
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { Injectable, UnauthorizedException } from "@nestjs/common";

import { AuthRepository } from '../auth.repository';
import { IJwtPayload } from '../jwt-payload.interface';
import { ConfigService } from '../../../config/config.service';
import { Configuration } from '../../../config/config.keys';

@Injectable()
export class JwtStategy extends PassportStrategy( Strategy ) {
    constructor( 
        private readonly _configService: ConfigService,

        @InjectRepository( AuthRepository )
        private readonly _authRepository: AuthRepository ) {

        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: _configService.get( Configuration.JWT_SECRET )
        });
    }

    async validate( payload: IJwtPayload ) {
        const { username } = payload;
        const user = await this._authRepository.findOne({
            where: { username, status: 'ACTIVE' } // @todo: Pass to magic string
        });
        if ( ! user ) return new UnauthorizedException();
        return payload;
    }
}