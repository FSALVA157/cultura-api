import { IsString, IsNotEmpty, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateActividadDto {
  @ApiProperty({
    example: 'Música',
    description: 'Nombre de la actividad',
    maxLength: 100,
  })
  @IsString()
  @IsNotEmpty()
  @Length(1, 100)
  actividad: string;
}
