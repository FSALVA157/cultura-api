import {
  IsString,
  IsOptional,
  IsNumber,
  IsDateString,
  IsNotEmpty,
  Length,
  Matches,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateConvocatoriaDto {
  @ApiProperty({
    example: 'Festival de Arte 2025',
    description: 'Nombre de la convocatoria',
    maxLength: 100,
  })
  @IsString()
  @IsNotEmpty()
  @Length(1, 100)
  convocatoria: string;

  @ApiPropertyOptional({
    example: 1,
    description: 'ID del tipo de convocatoria',
  })
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  tipo_id?: number;

  @ApiPropertyOptional({
    example: 'Festival anual de arte urbano y cultura popular',
    description: 'Descripción de la convocatoria',
    maxLength: 200,
  })
  @IsString()
  @IsOptional()
  @Length(1, 200)
  descripcion?: string;

  @ApiPropertyOptional({
    example: 'Bases y condiciones del festival',
    description: 'Reglamento de la convocatoria',
    maxLength: 500,
  })
  @IsString()
  @IsOptional()
  @Length(1, 500)
  reglamento?: string;

  @ApiPropertyOptional({
    example: '2025-11-15',
    description: 'Fecha de la convocatoria',
  })
  @IsDateString()
  @IsOptional()
  fecha?: string;

  @ApiPropertyOptional({
    example: 'Plaza Central - Centro Cultural',
    description: 'Ubicación del evento',
    maxLength: 200,
  })
  @IsString()
  @IsOptional()
  @Length(1, 200)
  ubicacion?: string;

  @ApiPropertyOptional({
    example: 'María González',
    description: 'Persona de contacto',
    maxLength: 100,
  })
  @IsString()
  @IsOptional()
  @Length(1, 100)
  referente?: string;

  @ApiPropertyOptional({
    example: '+54 11 4567-8901',
    description: 'Teléfono del referente',
  })
  @IsString()
  @IsOptional()
  @Matches(/^[\+]?[\d\s\-\(\)]{7,15}$/, {
    message: 'Teléfono debe tener un formato válido',
  })
  tel_referente?: string;
}
