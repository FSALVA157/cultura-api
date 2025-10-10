import { Module } from '@nestjs/common';
import { InscripcionesService } from './inscripciones.service';
import { InscripcionesController } from './inscripciones.controller';
import { Inscripciones } from './entities/inscripciones.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Inscripciones])],
  controllers: [InscripcionesController],
  providers: [InscripcionesService],
  exports: [InscripcionesService],
})
export class InscripcionesModule {}
