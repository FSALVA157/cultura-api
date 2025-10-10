import { Module } from '@nestjs/common';
import { ConvocatoriaService } from './convocatoria.service';
import { ConvocatoriaController } from './convocatoria.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Convocatoria } from './entities/convocatoria.entity';

@Module({
  controllers: [ConvocatoriaController],
  providers: [ConvocatoriaService],
  imports: [TypeOrmModule.forFeature([Convocatoria])],
})
export class ConvocatoriaModule {}
