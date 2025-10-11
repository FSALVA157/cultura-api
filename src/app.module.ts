import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonaModule } from './persona/persona.module';
import { SexoModule } from './sexo/sexo.module';
import { ActividadModule } from './actividad/actividad.module';
import { ConvocatoriaModule } from './convocatoria/convocatoria.module';
import { TipoModule } from './tipo_convocatoria/tipo/tipo.module';
import { InscripcionesModule } from './inscripciones/inscripciones.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: parseInt(configService.get('DB_PORT'), 10),
        username: configService.get('DB_USER'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        autoLoadEntities: true,
        synchronize: process.env.NODE_ENV !== 'production', // Cambiar de true
        ssl:
          process.env.NODE_ENV === 'production'
            ? { rejectUnauthorized: false }
            : false, // Agregar SSL
      }),
      inject: [ConfigService],
    }),
    PersonaModule,
    SexoModule,
    ActividadModule,
    ConvocatoriaModule,
    TipoModule,
    InscripcionesModule,
    // Other modules can be imported here
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
