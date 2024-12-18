import { Body, Controller, Get, Param, Patch, Post, UploadedFile } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Item as ItemDB } from '@prisma/client';
import { CreateItem } from './decorators/item.decorators';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { Item } from './entities/item.entity';
import { ItemService } from './item.service';

@ApiTags('Item')
@Controller('item')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Post()
  @CreateItem()
  async create(@UploadedFile() file: Express.Multer.File, @Body() createItemDto: CreateItemDto): Promise<ItemDB> {
    return this.itemService.create({ ...createItemDto, image: file });
  }

  // @Post()
  // create(@Body() createItemDto: CreateItemDto) {
  //   return this.itemService.create(createItemDto);
  // }

  @Get()
  findAll(): Promise<Item[]> {
    return this.itemService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.itemService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateItemDto: UpdateItemDto) {
    return this.itemService.update(+id, updateItemDto);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.itemService.remove(+id);
  // }
}
