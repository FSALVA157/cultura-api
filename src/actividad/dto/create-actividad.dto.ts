import { IsString, IsNotEmpty, Length } from 'class-validator';

export class CreateActividadDto {
  @IsString()
  @IsNotEmpty()
  @Length(1, 100)
  actividad: string;
}
