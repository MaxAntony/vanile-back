import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  const openApiConfig = new DocumentBuilder().setTitle('E-Commerce').setDescription('Api for the E-Commerce proyect').setVersion('1.0').build();
  const documentFactory = () => SwaggerModule.createDocument(app, openApiConfig);
  SwaggerModule.setup('api', app, documentFactory);

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
