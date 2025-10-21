import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

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

    // Configuración de Swagger
    const config = new DocumentBuilder()
      .setTitle('API Cultura')
      .setDescription(
        'API REST para gestión de cultura, convocatorias y personas',
      )
      .setVersion('1.0')
      .addTag('persona', 'Operaciones relacionadas con personas')
      .addTag('sexo', 'Catálogo de sexos')
      .addTag('actividad', 'Catálogo de actividades')
      .addTag('convocatoria', 'Gestión de convocatorias')
      .addTag('tipo', 'Tipos de convocatoria')
      .addTag('inscripciones', 'Gestión de inscripciones')
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/docs', app, document);

    const port = process.env.PORT ?? 3000;
    console.log(`🎧 Attempting to listen on port ${port}...`);
    await app.listen(port);

    console.log(`✅ Application is running on: http://localhost:${port}`);
    console.log(`📚 Swagger documentation: http://localhost:${port}/api/docs`);
  } catch (error) {
    console.error('❌ Error starting application:', error);
    process.exit(1);
  }
}
bootstrap();
