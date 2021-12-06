import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';
import { SharedModule } from '../../shared/shared.modules';
import { UserController } from './user.controller';

@Module({
    imports: [ TypeOrmModule.forFeature([ UserRepository ]), SharedModule ],
    providers: [UserService],
    controllers: [UserController]
})
export class UserModule {}
