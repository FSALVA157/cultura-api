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
import { PersonaService } from './persona.service';
import { CreatePersonaDto } from './dto/create-persona.dto';
import { UpdatePersonaDto } from './dto/update-persona.dto';
import { Persona } from './entities/persona.entity';

@ApiTags('persona')
@Controller('persona')
export class PersonaController {
  constructor(private readonly personaService: PersonaService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createPersonaDto: CreatePersonaDto): Promise<Persona> {
    return await this.personaService.create(createPersonaDto);
  }

  @Get()
  async findAll(): Promise<Persona[]> {
    return await this.personaService.findAll();
  }

  @Get('admins')
  async findAdmins(): Promise<Persona[]> {
    return await this.personaService.findAdmins();
  }

  @Get('tipo/:tipo')
  async findByTipoPersona(@Param('tipo') tipo: string): Promise<Persona[]> {
    return await this.personaService.findByTipoPersona(tipo);
  }

  @Get('email/:email')
  async findByEmail(@Param('email') email: string): Promise<Persona | null> {
    return await this.personaService.findByEmail(email);
  }

  @Get('dni/:dni')
  async findByDni(
    @Param('dni', ParseIntPipe) dni: number,
  ): Promise<Persona | null> {
    return await this.personaService.findByDni(dni);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Persona> {
    return await this.personaService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePersonaDto: UpdatePersonaDto,
  ): Promise<Persona> {
    return await this.personaService.update(id, updatePersonaDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async remove(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<{ message: string }> {
    return await this.personaService.remove(id);
  }
}
