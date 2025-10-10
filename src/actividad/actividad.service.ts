import {
  Injectable,
  NotFoundException,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateActividadDto } from './dto/create-actividad.dto';
import { UpdateActividadDto } from './dto/update-actividad.dto';
import { Actividad } from './entities/actividad.entity';

@Injectable()
export class ActividadService {
  constructor(
    @InjectRepository(Actividad)
    private readonly actividadRepository: Repository<Actividad>,
  ) {}

  async create(createActividadDto: CreateActividadDto): Promise<Actividad> {
    try {
      const actividad = this.actividadRepository.create(createActividadDto);
      return await this.actividadRepository.save(actividad);
    } catch (error) {
      // Manejar errores de duplicados (actividad única)
      if (error.code === '23505') {
        throw new ConflictException('Ya existe una actividad con este nombre');
      }
      throw new BadRequestException('Error al crear la actividad');
    }
  }

  async findAll(): Promise<Actividad[]> {
    return await this.actividadRepository.find({
      order: {
        actividad: 'ASC',
      },
    });
  }

  async findOne(id: number): Promise<Actividad> {
    const actividad = await this.actividadRepository.findOne({
      where: { id_actividad: id },
    });

    if (!actividad) {
      throw new NotFoundException(`Actividad con ID ${id} no encontrada`);
    }

    return actividad;
  }

  async findByActividad(actividadNombre: string): Promise<Actividad | null> {
    return await this.actividadRepository.findOne({
      where: { actividad: actividadNombre },
    });
  }

  async update(
    id: number,
    updateActividadDto: UpdateActividadDto,
  ): Promise<Actividad> {
    const actividad = await this.findOne(id);

    try {
      Object.assign(actividad, updateActividadDto);
      return await this.actividadRepository.save(actividad);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Ya existe una actividad con este nombre');
      }
      throw new BadRequestException('Error al actualizar la actividad');
    }
  }

  async remove(id: number): Promise<{ message: string }> {
    const actividad = await this.findOne(id);
    await this.actividadRepository.remove(actividad);
    return { message: `Actividad con ID ${id} eliminada correctamente` };
  }
}
