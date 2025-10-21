import { IsInt, IsEnum, IsOptional, IsPositive } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { EstadoInscripcion } from '../entities/inscripciones.entity';

export class CreateInscripcioneDto {
  @ApiProperty({
    example: 1,
    description: 'ID de la persona que se inscribe',
    minimum: 1,
  })
  @IsInt()
  @IsPositive()
  persona_id: number;

  @ApiProperty({
    example: 1,
    description: 'ID de la convocatoria',
    minimum: 1,
  })
  @IsInt()
  @IsPositive()
  convocatoria_id: number;

  @ApiPropertyOptional({
    example: 'activo',
    description: 'Estado de la inscripción',
    enum: EstadoInscripcion,
    default: EstadoInscripcion.ACTIVO,
  })
  @IsOptional()
  @IsEnum(EstadoInscripcion)
  estado?: EstadoInscripcion;
}
