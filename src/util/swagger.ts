import { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

export function setupSwagger(app: INestApplication): void {
  const options = new DocumentBuilder()
    .setTitle('NestJS API - hogun')
    .setDescription('webprogramming API')
    .setVersion('2.0.1')
    .build(); // build() 메서드를 호출하여 완성된 문서로 변환합니다.

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document);
}
