import { IsString, MaxLength } from "class-validator";

export class CreateRoleDto {

    @IsString()
    @MaxLength(50, { message: 'This name isn\'t valid' })
    readonly name: string;

    @IsString()
    @MaxLength(100, { message: 'This description isn\'t valid' })    
    readonly description: string;
}