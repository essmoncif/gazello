import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
    .setTitle('Gazello application')
    .setDescription('The Gazello API description')
    .setVersion('1.0')
    .addTag('Gazello')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.APP_PORT || 4000);
  Logger.log(`Server running on http://localhost:${process.env.APP_PORT}`, 'Bootstrap');
}
bootstrap();
