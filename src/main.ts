import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from './util/swagger';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const corsOptions: CorsOptions = {
    origin: 'http://localhost:3000', // 클라이언트의 출처 (React 앱이 호스팅되는 곳)
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Accept',
    preflightContinue: false,
    optionsSuccessStatus: 204,
  };

  setupSwagger(app);

  await app.listen(3000);
}
bootstrap();
