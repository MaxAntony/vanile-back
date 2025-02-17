import { DatabaseService } from '@/common/database/database.service';
import { Injectable } from '@nestjs/common';
import { hashSync } from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly db: DatabaseService) {}

  async create(createUserDto: CreateUserDto) {
    await this.db.user.create({ data: { ...createUserDto, password: hashSync(createUserDto.password, 10) } });
    return 'ok';
  }

  async findAll() {
    return await this.db.user.findMany();
  }

  async findOneWithoutPassword(email: string) {
    const user = await this.db.user.findUnique({ where: { email } });

    // const { password: _, ...result } = user;
    //     return result;

    delete user.password;
    return user;
  }

  async findOne(email: string) {
    const user = await this.db.user.findUnique({ where: { email } });
    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    console.log(updateUserDto);
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
