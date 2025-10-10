import { IsString, IsNotEmpty, Length } from 'class-validator';

export class CreateTipoDto {
  @IsString()
  @IsNotEmpty()
  @Length(1, 150)
  tipo_convocatoria: string;
}
