import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from './util/swagger';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { createProxyMiddleware } from 'http-proxy-middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: '*', // 모든 도메인 허용
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Accept, Authorization, Origin, X-Requested-With',
    credentials: true,
  });

  setupSwagger(app);

  app.use('/auth/googleLogin', createProxyMiddleware({
    target: 'https://accounts.google.com',
    changeOrigin: true,
    pathRewrite: {
      '^/auth/googleLogin': '/o/oauth2/v2/auth', // 프록시 경로 재작성
    },
  }));

  await app.listen(3000);
}
bootstrap();
