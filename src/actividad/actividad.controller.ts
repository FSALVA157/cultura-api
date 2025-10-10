import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { ActividadService } from './actividad.service';
import { CreateActividadDto } from './dto/create-actividad.dto';
import { UpdateActividadDto } from './dto/update-actividad.dto';
import { Actividad } from './entities/actividad.entity';

@Controller('actividad')
export class ActividadController {
  constructor(private readonly actividadService: ActividadService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() createActividadDto: CreateActividadDto,
  ): Promise<Actividad> {
    return await this.actividadService.create(createActividadDto);
  }

  @Get()
  async findAll(): Promise<Actividad[]> {
    return await this.actividadService.findAll();
  }

  @Get('nombre/:actividad')
  async findByActividad(
    @Param('actividad') actividad: string,
  ): Promise<Actividad | null> {
    return await this.actividadService.findByActividad(actividad);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Actividad> {
    return await this.actividadService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateActividadDto: UpdateActividadDto,
  ): Promise<Actividad> {
    return await this.actividadService.update(id, updateActividadDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async remove(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<{ message: string }> {
    return await this.actividadService.remove(id);
  }
}
