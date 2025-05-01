// backend/src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // CORS を有効にする
  app.enableCors({
    origin: '*', // または特定のオリジン (例: 'http://localhost:5173') を指定
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type,Accept',
  });

  await app.listen(3000); // 例としてポート 3000 で起動
  console.log(`NestJS application is running on: ${await app.getUrl()}`);
}
bootstrap();
