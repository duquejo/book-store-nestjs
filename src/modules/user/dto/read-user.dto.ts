import { IsEmail, IsNumber, IsString } from "class-validator";
import { ReadUserDetailDto } from './read-user-details.dto';
import { Type, Expose, Exclude } from 'class-transformer';
import { ReadRoleDto } from '../../role/dtos/read-role.dto';

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
    @Type( type => ReadRoleDto )
    readonly roles: ReadRoleDto[]; // Exclude unuseful properties from rtole
}