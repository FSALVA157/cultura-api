import {
  Injectable,
  NotFoundException,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePersonaDto } from './dto/create-persona.dto';
import { UpdatePersonaDto } from './dto/update-persona.dto';
import { Persona } from './entities/persona.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class PersonaService {
  constructor(
    @InjectRepository(Persona)
    private readonly personaRepository: Repository<Persona>,
  ) {}

  async create(createPersonaDto: CreatePersonaDto): Promise<Persona> {
    try {
      // Hash de la contraseña antes de guardar
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(
        createPersonaDto.password,
        saltRounds,
      );

      // Crear la nueva persona con la contraseña hasheada
      const persona = this.personaRepository.create({
        ...createPersonaDto,
        password: hashedPassword,
      });

      return await this.personaRepository.save(persona);
    } catch (error) {
      // Manejar errores de duplicados (email o dni únicos)
      if (error.code === '23505') {
        const detail = error.detail || '';
        if (detail.includes('email')) {
          throw new ConflictException('El email ya está en uso');
        }
        if (detail.includes('dni')) {
          throw new ConflictException('El DNI ya está registrado');
        }
        throw new ConflictException('Ya existe un registro con estos datos');
      }
      throw new BadRequestException('Error al crear la persona');
    }
  }

  async findAll(): Promise<Persona[]> {
    return await this.personaRepository.find({
      relations: ['sexo', 'actividad'],
      select: [
        'id_persona',
        'email',
        'nombre',
        'apellido',
        'dni',
        'cuil_cuit',
        'rol_id',
        'es_admin',
        'area_id',
        'sexo_id',
        'fecha_nacimiento',
        'direccion',
        'localidad',
        'provincia',
        'telefono',
        'localidad_id',
        'tipo_persona',
        'nombre_razon_social',
        'actividad_id',
        'created_at',
        'updated_at',
      ], // Excluir password por seguridad
      order: {
        created_at: 'DESC',
      },
    });
  }

  async findOne(id: number): Promise<Persona> {
    const persona = await this.personaRepository.findOne({
      where: { id_persona: id },
      relations: ['sexo', 'actividad'],
      select: [
        'id_persona',
        'email',
        'nombre',
        'apellido',
        'dni',
        'cuil_cuit',
        'rol_id',
        'es_admin',
        'area_id',
        'sexo_id',
        'fecha_nacimiento',
        'direccion',
        'localidad',
        'provincia',
        'telefono',
        'localidad_id',
        'tipo_persona',
        'nombre_razon_social',
        'actividad_id',
        'created_at',
        'updated_at',
      ], // Excluir password por seguridad
    });

    if (!persona) {
      throw new NotFoundException(`Persona con ID ${id} no encontrada`);
    }

    return persona;
  }

  async findByEmail(email: string): Promise<Persona | null> {
    return await this.personaRepository.findOne({
      where: { email },
    });
  }

  async findByDni(dni: number): Promise<Persona | null> {
    return await this.personaRepository.findOne({
      where: { dni },
    });
  }

  async update(
    id: number,
    updatePersonaDto: UpdatePersonaDto,
  ): Promise<Persona> {
    const persona = await this.findOne(id);

    try {
      // Si se está actualizando la contraseña, hashearla
      if (updatePersonaDto.password) {
        const saltRounds = 10;
        updatePersonaDto.password = await bcrypt.hash(
          updatePersonaDto.password,
          saltRounds,
        );
      }

      // Actualizar los datos
      Object.assign(persona, updatePersonaDto);
      return await this.personaRepository.save(persona);
    } catch (error) {
      // Manejar errores de duplicados
      if (error.code === '23505') {
        const detail = error.detail || '';
        if (detail.includes('email')) {
          throw new ConflictException('El email ya está en uso');
        }
        if (detail.includes('dni')) {
          throw new ConflictException('El DNI ya está registrado');
        }
        throw new ConflictException('Ya existe un registro con estos datos');
      }
      throw new BadRequestException('Error al actualizar la persona');
    }
  }

  async remove(id: number): Promise<{ message: string }> {
    const persona = await this.findOne(id);
    await this.personaRepository.remove(persona);
    return { message: `Persona con ID ${id} eliminada correctamente` };
  }

  async findAdmins(): Promise<Persona[]> {
    return await this.personaRepository.find({
      where: { es_admin: true },
      select: [
        'id_persona',
        'email',
        'nombre',
        'apellido',
        'dni',
        'area_id',
        'created_at',
      ],
    });
  }

  async findByTipoPersona(tipo: string): Promise<Persona[]> {
    return await this.personaRepository.find({
      where: { tipo_persona: tipo as any },
      select: [
        'id_persona',
        'email',
        'nombre',
        'apellido',
        'dni',
        'tipo_persona',
        'nombre_razon_social',
        'created_at',
      ],
    });
  }
}
