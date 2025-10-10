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
import { TipoPersona } from '../entities/persona.entity';

export class CreatePersonaDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsOptional()
  @Length(1, 100)
  nombre?: string;

  @IsString()
  @IsOptional()
  @Length(1, 100)
  apellido?: string;

  @IsString()
  @IsNotEmpty()
  @Length(6, 255)
  password: string;

  @IsNumber()
  @IsNotEmpty()
  @Min(1000000) // Mínimo 7 dígitos
  @Max(99999999) // Máximo 8 dígitos
  @Type(() => Number)
  dni: number;

  @IsString()
  @IsOptional()
  @Matches(/^\d{2}-\d{8}-\d{1}$/, {
    message: 'CUIL/CUIT debe tener el formato XX-XXXXXXXX-X',
  })
  cuil_cuit?: string;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  rol_id?: number;

  @IsBoolean()
  @IsOptional()
  @Transform(({ value }) => value === 'true' || value === true)
  es_admin?: boolean = false;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  area_id?: number;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  sexo_id?: number;

  @IsDateString()
  @IsOptional()
  fecha_nacimiento?: string;

  @IsString()
  @IsOptional()
  @Length(1, 500)
  direccion?: string;

  @IsString()
  @IsOptional()
  @Length(1, 100)
  localidad?: string;

  @IsString()
  @IsOptional()
  @Length(1, 100)
  provincia?: string;

  @IsString()
  @IsOptional()
  @Matches(/^[\+]?[\d\s\-\(\)]{7,15}$/, {
    message: 'Teléfono debe tener un formato válido',
  })
  telefono?: string;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  localidad_id?: number;

  @IsEnum(TipoPersona)
  @IsNotEmpty()
  tipo_persona: TipoPersona;

  @IsString()
  @IsOptional()
  @Length(1, 255)
  nombre_razon_social?: string;

  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  actividad_id: number;
}
