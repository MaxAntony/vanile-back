import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UploadedFile } from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
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
  @Get('search')
  @ApiQuery({ name: 'query', required: false, description: 'Texto para buscar items por nombre' })
  async search(@Query('query') query: string): Promise<Item[]> {
    if (!query) return this.itemService.findAll();
    return this.itemService.search(query);
  }

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

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.itemService.remove(+id);
  }
}
