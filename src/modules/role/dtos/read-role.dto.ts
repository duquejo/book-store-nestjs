import { IsNumber, IsString, MaxLength } from "class-validator";
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class ReadRoleDto {

    // @Expose({ name: 'identifier' }) // Expose param
    @Expose()
    @IsNumber()
    readonly id: number;

    @Expose()    
    @IsString()
    @MaxLength(50, { message: 'This name isn\'t valid' })
    readonly name: string;

    @Expose()    
    @IsString()
    @MaxLength(100, { message: 'This description isn\'t valid' })    
    readonly description: string;
}