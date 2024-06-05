import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from './swagger';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  // swagger
  setupSwagger(app);
  await app.listen(3000);
}
bootstrap();
