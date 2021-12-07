import { IsEmail, IsNumber, IsString } from "class-validator";
import { ReadUserDetailDto } from './read-user-details.dto';
import { Type, Expose, Exclude } from 'class-transformer';
import { ReadUserRolesDto } from './read-user-roles.dto';

@Exclude()
export class ReadUserDto {

    @Expose()
    @IsNumber()
    readonly id: number;

    @Expose()
    @IsEmail()
    readonly email: string;

    @Expose()
    @IsString()
    readonly username: string;

    @Expose()
    @IsString()
    readonly status: string;

    @Expose()
    @Type( type => ReadUserDetailDto )
    readonly details: ReadUserDetailDto

    @Expose()
    @Type( type => ReadUserRolesDto )
    readonly roles: ReadUserRolesDto[]; // Exclude unuseful properties from rtole
}