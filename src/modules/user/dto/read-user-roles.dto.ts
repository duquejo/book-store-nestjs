import { IsString } from "class-validator";
import { Exclude, Expose } from "class-transformer";

@Exclude()
export class ReadUserRolesDto {

    @Expose()
    @IsString()
    readonly name: string;

    @Expose()
    @IsString()
    readonly description: string;

    @Expose()
    @IsString()
    readonly status: string;
}