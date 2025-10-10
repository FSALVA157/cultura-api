import { IsInt, IsEnum, IsOptional, IsPositive } from 'class-validator';
import { EstadoInscripcion } from '../entities/inscripciones.entity';

export class CreateInscripcioneDto {
  @IsInt()
  @IsPositive()
  persona_id: number;

  @IsInt()
  @IsPositive()
  convocatoria_id: number;

  @IsOptional()
  @IsEnum(EstadoInscripcion)
  estado?: EstadoInscripcion;
}
