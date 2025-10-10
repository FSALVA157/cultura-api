import { Module } from '@nestjs/common';
import { SexoService } from './sexo.service';
import { SexoController } from './sexo.controller';
import { Sexo } from './entities/sexo.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [SexoController],
  providers: [SexoService],
  imports: [TypeOrmModule.forFeature([Sexo])],
})
export class SexoModule {}
