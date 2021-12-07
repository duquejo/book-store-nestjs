import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleRepository } from './role.repository';
import { Role } from './role.entity';
import { ReadRoleDto } from './dtos/read-role.dto';
import { plainToClass } from 'class-transformer';
import { CreateRoleDto, UpdateRoleDto } from './dtos';

@Injectable()
export class RoleService {
    constructor(
        @InjectRepository( RoleRepository )
        private readonly _roleRepository: RoleRepository
    ) {}

    async get( id: number ): Promise<ReadRoleDto> {
        if( ! id ) throw new BadRequestException( 'Id must be sent' );
        const role: Role = await this._roleRepository.findOne( id, {
            where: { status: 'ACTIVE' }
        });
        if( ! role ) throw new NotFoundException();
        return plainToClass( ReadRoleDto, role ); // Will map the exact class properties and it returns the pared ones
    }

    async getAll(): Promise<ReadRoleDto[]> {
        const roles: Role[] = await this._roleRepository.find( {
            where: { status: 'ACTIVE' }
        });
        return roles.map( ( role: Role ) => plainToClass( ReadRoleDto, role ) );
    }

    /**
     * 
     * You should use Partial when you don't need to get all DTO properties as mandatory
     * The method may update only a property if its necessary 
     */
    async create( role: Partial<CreateRoleDto> ): Promise<ReadRoleDto> {
        const savedRole: Role = await this._roleRepository.save( role );
        return plainToClass( ReadRoleDto, savedRole );
    }

    async update( roleId: number, role: Partial<UpdateRoleDto> ): Promise<ReadRoleDto> {
        const foundRole = await this._roleRepository.findOne( roleId, { 
            where: { status: 'ACTIVE' }
        });
        if( ! foundRole ) throw new NotFoundException('This role doesn\'t exist');
        foundRole.name = role.name;
        foundRole.description = role.description;
        const updatedRole: Role = await this._roleRepository.save( foundRole );
        return plainToClass( ReadRoleDto, updatedRole );
    }

    async delete( id: number ): Promise<void> {
        const roleExists = await this._roleRepository.findOne( id, {
            where: { status: 'ACTIVE' }
        });
        if( ! roleExists ) throw new NotFoundException();
        await this._roleRepository.update( id, { status: 'INACTIVE' } );
    }
}