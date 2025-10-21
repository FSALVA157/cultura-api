import { IsString, IsNotEmpty, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSexoDto {
  @ApiProperty({
    example: 'Masculino',
    description: 'Nombre del sexo',
    maxLength: 50,
  })
  @IsString()
  @IsNotEmpty()
  @Length(1, 50)
  sexo: string;
}
