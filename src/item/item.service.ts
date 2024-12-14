import { DatabaseService } from '@/common/database/database.service';
import { Injectable } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';

@Injectable()
export class ItemService {
  constructor(private readonly db: DatabaseService) {}

  create(createItemDto: CreateItemDto) {
    const imageUrl = createItemDto.image;
    return this.db.item.create({ data: { ...createItemDto, imageUrl } });
  }

  findAll() {
    return this.db.item.findMany();
  }

  findOne(id: number) {
    return this.db.item.findUnique({ where: { id } });
  }

  update(id: number, updateItemDto: UpdateItemDto) {
    const imageUrl = updateItemDto.image;
    return this.db.item.update({ where: { id }, data: { ...updateItemDto, imageUrl } });
  }

  remove(id: number) {
    return `This action removes a #${id} item`;
  }

  deactivate() {
    // return this.db.update
  }
}
