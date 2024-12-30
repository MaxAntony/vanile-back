import { cloudinary } from '@/cloudinary.config';
import { DatabaseService } from '@/common/database/database.service';
import { Injectable } from '@nestjs/common';
import { UploadApiResponse } from 'cloudinary';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';

@Injectable()
export class ItemService {
  constructor(private readonly db: DatabaseService) {}

  async create(createItemDto: CreateItemDto) {
    const uploadResult = await this.uploadImage(createItemDto.image);
    const result = await this.db.item.create({
      data: {
        name: createItemDto.name,
        price: createItemDto.price,
        imageUrl: uploadResult.secure_url,
      },
    });
    return result;
  }

  findAll() {
    return this.db.item.findMany({ orderBy: { createdAt: 'desc' } });
  }

  findOne(id: number) {
    return this.db.item.findUnique({ where: { id } });
  }

  search(query: string) {
    return this.db.item.findMany({
      where: {
        name: {
          contains: query,
          mode: 'insensitive',
        },
      },
    });
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

  async uploadImage(file: Express.Multer.File): Promise<UploadApiResponse> {
    return new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ folder: 'saas' }, (error, result) => {
          if (error) return reject(error);
          resolve(result);
        })
        .end(file.buffer);
    });
  }
}
