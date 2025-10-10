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

export class CreateConvocatoriaDto {
  @IsString()
  @IsNotEmpty()
  @Length(1, 100)
  convocatoria: string;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  tipo_id?: number;

  @IsString()
  @IsOptional()
  @Length(1, 200)
  descripcion?: string;

  @IsString()
  @IsOptional()
  @Length(1, 500)
  reglamento?: string;

  @IsDateString()
  @IsOptional()
  fecha?: string;

  @IsString()
  @IsOptional()
  @Length(1, 200)
  ubicacion?: string;

  @IsString()
  @IsOptional()
  @Length(1, 100)
  referente?: string;

  @IsString()
  @IsOptional()
  @Matches(/^[\+]?[\d\s\-\(\)]{7,15}$/, {
    message: 'Teléfono debe tener un formato válido',
  })
  tel_referente?: string;
}
