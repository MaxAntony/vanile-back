import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import './cloudinary.config';
import { DATA } from './constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  // Swagger configs
  const openApiConfig = new DocumentBuilder()
    .setTitle(DATA.appName)
    .setDescription('Api for the E-Commerce project')
    .setVersion('1.0')
    .build();
  const documentFactory = () =>
    SwaggerModule.createDocument(app, openApiConfig, {
      operationIdFactory: (controllerKey, methodKey, version) => {
        const versionPart = version ? `_${version}` : '';
        return `${controllerKey.replace('Controller', '')}_${methodKey}${versionPart}`;
      },
    });
  SwaggerModule.setup('api', app, documentFactory);

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
