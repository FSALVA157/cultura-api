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
import { ApiTags } from '@nestjs/swagger';
import { SexoService } from './sexo.service';
import { CreateSexoDto } from './dto/create-sexo.dto';
import { UpdateSexoDto } from './dto/update-sexo.dto';
import { Sexo } from './entities/sexo.entity';

@ApiTags('sexo')
@Controller('sexo')
export class SexoController {
  constructor(private readonly sexoService: SexoService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createSexoDto: CreateSexoDto): Promise<Sexo> {
    return await this.sexoService.create(createSexoDto);
  }

  @Get()
  async findAll(): Promise<Sexo[]> {
    return await this.sexoService.findAll();
  }

  @Get('nombre/:sexo')
  async findBySexo(@Param('sexo') sexo: string): Promise<Sexo | null> {
    return await this.sexoService.findBySexo(sexo);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Sexo> {
    return await this.sexoService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateSexoDto: UpdateSexoDto,
  ): Promise<Sexo> {
    return await this.sexoService.update(id, updateSexoDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async remove(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<{ message: string }> {
    return await this.sexoService.remove(id);
  }
}
