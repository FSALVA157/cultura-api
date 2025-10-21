import { IsString, IsNotEmpty, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTipoDto {
  @ApiProperty({
    example: 'Festival Cultural',
    description: 'Nombre del tipo de convocatoria',
    maxLength: 150,
  })
  @IsString()
  @IsNotEmpty()
  @Length(1, 150)
  tipo_convocatoria: string;
}
