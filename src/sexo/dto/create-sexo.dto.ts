import { IsString, IsNotEmpty, Length } from 'class-validator';

export class CreateSexoDto {
  @IsString()
  @IsNotEmpty()
  @Length(1, 50)
  sexo: string;
}
