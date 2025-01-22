import { DatabaseService } from '@/common/database/database.service';
import { Injectable } from '@nestjs/common';
import { hashSync } from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly db: DatabaseService) {}

  async create(createUserDto: CreateUserDto) {
    const result = await this.db.user.create({ data: { ...createUserDto, password: hashSync(createUserDto.password, 10) } });
    return 'ok';
  }

  findAll() {
    return this.db.user.findMany();
  }

  async findOne(email: string) {
    const user = await this.db.user.findUnique({ where: { email } });

    const { password, ...result } = user;
    return result;
  }

  async findOneWithPassword(email: string) {
    const user = await this.db.user.findUnique({ where: { email } });
    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
