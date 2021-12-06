import { EntityRepository, getConnection, Repository } from "typeorm";
import { User } from '../user/user.entity';
import { SignupDto } from './dto/signup.dto';
import { RoleRepository } from '../role/role.repository';
import { Role } from '../role/role.entity';
import { RoleType } from '../role/roleType.enum';
import { UserDetails } from '../user/user.details.entity';
import { genSalt, getSalt, hash } from "bcryptjs";

@EntityRepository(User)
export class AuthRepository extends Repository<User>{
    
    async signup( signupDto: SignupDto ){
        const { username, email, password } = signupDto;
        const user = new User();
        user.username = username;
        user.email = email;

        const RoleRepository: RoleRepository = await getConnection().getRepository(
            Role,
        );

        /**
         * Default Role
         * @see GENERAL must be created on DB
         */
        const defaultRole: Role = await RoleRepository.findOne({
            where: {
                name: RoleType.GENERAL
            }
        });

        user.roles = [defaultRole];

        const details = new UserDetails(); // TypeORM will create an empty UserDetails data 
        user.details = details;

        const salt = await genSalt();
        user.password = await hash( password, salt );

        /**
         * Save user
         */
        await user.save();
    }
}