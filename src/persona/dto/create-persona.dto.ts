import {
  IsEmail,
  IsString,
  IsOptional,
  IsNumber,
  IsBoolean,
  IsDateString,
  IsEnum,
  IsNotEmpty,
  Length,
  Min,
  Max,
  Matches,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { TipoPersona } from '../entities/persona.entity';

export class CreatePersonaDto {
  @ApiProperty({
    example: 'usuario@ejemplo.com',
    description: 'Email único del usuario',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiPropertyOptional({
    example: 'Juan',
    description: 'Nombre de la persona',
  })
  @IsString()
  @IsOptional()
  @Length(1, 100)
  nombre?: string;

  @ApiPropertyOptional({
    example: 'Pérez',
    description: 'Apellido de la persona',
  })
  @IsString()
  @IsOptional()
  @Length(1, 100)
  apellido?: string;

  @ApiProperty({
    example: 'password123',
    description: 'Contraseña del usuario (mínimo 6 caracteres)',
  })
  @IsString()
  @IsNotEmpty()
  @Length(6, 255)
  password: string;

  @ApiProperty({
    example: 12345678,
    description: 'DNI (7 u 8 dígitos)',
    minimum: 1000000,
    maximum: 99999999,
  })
  @IsNumber()
  @IsNotEmpty()
  @Min(1000000) // Mínimo 7 dígitos
  @Max(99999999) // Máximo 8 dígitos
  @Type(() => Number)
  dni: number;

  @ApiPropertyOptional({
    example: '20-12345678-9',
    description: 'CUIL/CUIT en formato XX-XXXXXXXX-X',
  })
  @IsString()
  @IsOptional()
  @Matches(/^\d{2}-\d{8}-\d{1}$/, {
    message: 'CUIL/CUIT debe tener el formato XX-XXXXXXXX-X',
  })
  cuil_cuit?: string;

  @ApiPropertyOptional({
    example: 1,
    description: 'ID del rol asignado',
  })
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  rol_id?: number;

  @ApiPropertyOptional({
    example: false,
    description: 'Indica si el usuario es administrador',
    default: false,
  })
  @IsBoolean()
  @IsOptional()
  @Transform(({ value }) => value === 'true' || value === true)
  es_admin?: boolean = false;

  @ApiPropertyOptional({
    example: 1,
    description: 'ID del área asignada',
  })
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  area_id?: number;

  @ApiPropertyOptional({
    example: 1,
    description: 'ID del sexo',
  })
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  sexo_id?: number;

  @ApiPropertyOptional({
    example: '1990-01-15',
    description: 'Fecha de nacimiento en formato ISO',
  })
  @IsDateString()
  @IsOptional()
  fecha_nacimiento?: string;

  @ApiPropertyOptional({
    example: 'Calle Falsa 123',
    description: 'Dirección completa',
  })
  @IsString()
  @IsOptional()
  @Length(1, 500)
  direccion?: string;

  @ApiPropertyOptional({
    example: 'Ciudad Autónoma de Buenos Aires',
    description: 'Localidad',
  })
  @IsString()
  @IsOptional()
  @Length(1, 100)
  localidad?: string;

  @ApiPropertyOptional({
    example: 'Buenos Aires',
    description: 'Provincia',
  })
  @IsString()
  @IsOptional()
  @Length(1, 100)
  provincia?: string;

  @ApiPropertyOptional({
    example: '+54 11 4567-8901',
    description: 'Teléfono de contacto',
  })
  @IsString()
  @IsOptional()
  @Matches(/^[\+]?[\d\s\-\(\)]{7,15}$/, {
    message: 'Teléfono debe tener un formato válido',
  })
  telefono?: string;

  @ApiPropertyOptional({
    example: 1,
    description: 'ID de la localidad',
  })
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  localidad_id?: number;

  @ApiProperty({
    example: 'humana',
    description: 'Tipo de persona: humana o juridica',
    enum: TipoPersona,
  })
  @IsEnum(TipoPersona)
  @IsNotEmpty()
  tipo_persona: TipoPersona;

  @ApiPropertyOptional({
    example: 'Asociación Cultural',
    description: 'Nombre o razón social (para personas jurídicas)',
  })
  @IsString()
  @IsOptional()
  @Length(1, 255)
  nombre_razon_social?: string;

  @ApiProperty({
    example: 1,
    description: 'ID de la actividad principal',
  })
  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  actividad_id: number;
}
