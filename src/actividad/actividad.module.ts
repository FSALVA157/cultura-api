import { Module } from '@nestjs/common';
import { ActividadService } from './actividad.service';
import { ActividadController } from './actividad.controller';
import { Actividad } from './entities/actividad.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [ActividadController],
  providers: [ActividadService],
  imports: [TypeOrmModule.forFeature([Actividad])],
})
export class ActividadModule {}
