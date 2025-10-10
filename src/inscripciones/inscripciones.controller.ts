import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  ValidationPipe,
  ParseIntPipe,
} from '@nestjs/common';
import { InscripcionesService } from './inscripciones.service';
import { CreateInscripcioneDto } from './dto/create-inscripcione.dto';
import { UpdateInscripcioneDto } from './dto/update-inscripcione.dto';

@Controller('inscripciones')
export class InscripcionesController {
  constructor(private readonly inscripcionesService: InscripcionesService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body(ValidationPipe) createInscripcioneDto: CreateInscripcioneDto) {
    return this.inscripcionesService.create(createInscripcioneDto);
  }

  @Get()
  findAll() {
    return this.inscripcionesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.inscripcionesService.findOne(id);
  }

  @Get('persona/:personaId')
  findByPersona(@Param('personaId', ParseIntPipe) personaId: number) {
    return this.inscripcionesService.findByPersona(personaId);
  }

  @Get('convocatoria/:convocatoriaId')
  findByConvocatoria(
    @Param('convocatoriaId', ParseIntPipe) convocatoriaId: number,
  ) {
    return this.inscripcionesService.findByConvocatoria(convocatoriaId);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) updateInscripcioneDto: UpdateInscripcioneDto,
  ) {
    return this.inscripcionesService.update(id, updateInscripcioneDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.inscripcionesService.remove(id);
  }
}
