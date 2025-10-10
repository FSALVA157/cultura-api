import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { ConvocatoriaService } from './convocatoria.service';
import { CreateConvocatoriaDto } from './dto/create-convocatoria.dto';
import { UpdateConvocatoriaDto } from './dto/update-convocatoria.dto';
import { Convocatoria } from './entities/convocatoria.entity';

@Controller('convocatoria')
export class ConvocatoriaController {
  constructor(private readonly convocatoriaService: ConvocatoriaService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() createConvocatoriaDto: CreateConvocatoriaDto,
  ): Promise<Convocatoria> {
    return await this.convocatoriaService.create(createConvocatoriaDto);
  }

  @Get()
  async findAll(): Promise<Convocatoria[]> {
    return await this.convocatoriaService.findAll();
  }

  @Get('buscar/nombre')
  async findByNombre(@Query('q') nombre: string): Promise<Convocatoria[]> {
    return await this.convocatoriaService.findByNombre(nombre);
  }

  @Get('tipo/:tipoId')
  async findByTipo(
    @Param('tipoId', ParseIntPipe) tipoId: number,
  ): Promise<Convocatoria[]> {
    return await this.convocatoriaService.findByTipo(tipoId);
  }

  @Get('fecha/:fecha')
  async findByFecha(@Param('fecha') fecha: string): Promise<Convocatoria[]> {
    return await this.convocatoriaService.findByFecha(fecha);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Convocatoria> {
    return await this.convocatoriaService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateConvocatoriaDto: UpdateConvocatoriaDto,
  ): Promise<Convocatoria> {
    return await this.convocatoriaService.update(id, updateConvocatoriaDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async remove(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<{ message: string }> {
    return await this.convocatoriaService.remove(id);
  }
}
