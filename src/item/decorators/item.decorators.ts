import { applyDecorators, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateItemDto } from '../dto/create-item.dto';

export function CreateItem() {
  return applyDecorators(
    UseInterceptors(FileInterceptor('image')),
    ApiOperation({ summary: 'Create a new product with an image' }),
    ApiConsumes('multipart/form-data'),
    ApiBody({
      description: 'Form data for creating a product',
      type: CreateItemDto,
    }),
    ApiResponse({ status: 201, description: 'Product created successfully.' }),
    ApiResponse({ status: 400, description: 'Invalid input data.' }),
  );
}
