import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleRepository } from './role.repository';
import { SharedModule } from '../../shared/shared.modules';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';

@Module({
    imports: [ TypeOrmModule.forFeature([ RoleRepository ]), SharedModule ],
    providers: [RoleService],
    controllers: [RoleController]
})
export class RoleModule {}