import { IsString, MaxLength } from "class-validator";

export class UpdateRoleDto {

    @IsString()
    @MaxLength(50, { message: 'This name isn\'t valid' })
    readonly name: string;

    @IsString()
    @MaxLength(100, { message: 'This description isn\'t valid' })    
    readonly description: string;
}