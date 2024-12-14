import { Injectable } from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';

@Injectable()
export class CloudinaryService {
  // constructor(private configService: ConfigService) {
  //   cloudinary.config({
  //     cloud_name: this.configService.get('CLOUDINARY_CLOUD_NAME'),
  //     api_key: this.configService.get('CLOUDINARY_API_KEY'),
  //     api_secret: this.configService.get('CLOUDINARY_API_SECRET'),
  //   });
  // }
  //
  // async uploadImage(file: Express.Multer.File): Promise<any> {
  //   if (!file) {
  //     throw new BadRequestException('File not provided');
  //   }
  //
  //   return new Promise((resolve, reject) => {
  //     const uploadStream = cloudinary.uploader.upload_stream({ folder: 'products' }, (error, result) => {
  //       if (error) return reject(error);
  //       resolve(result);
  //     });
  //
  //     const readable = new Readable();
  //     readable._read = () => {};
  //     readable.push(file.buffer);
  //     readable.push(null);
  //     readable.pipe(uploadStream);
  //   });
  // }
}
