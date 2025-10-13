import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  console.log('🚀 Starting NestJS application...');
  console.log('📊 Environment variables:');
  console.log('- DB_HOST:', process.env.DB_HOST);
  console.log('- DB_PORT:', process.env.DB_PORT);
  console.log('- DB_NAME:', process.env.DB_NAME);
  console.log('- DB_USER:', process.env.DB_USER);

  try {
    console.log('🏗️  Creating NestJS application...');
    const app = await NestFactory.create(AppModule);

    // Enable validation pipes globally
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );

    app.enableCors();

    const port = process.env.PORT ?? 3000;
    console.log(`🎧 Attempting to listen on port ${port}...`);
    await app.listen(port);

    console.log(`✅ Application is running on: http://localhost:${port}`);
  } catch (error) {
    console.error('❌ Error starting application:', error);
    process.exit(1);
  }
}
bootstrap();
