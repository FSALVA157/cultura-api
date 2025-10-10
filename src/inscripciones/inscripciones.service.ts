import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateInscripcioneDto } from './dto/create-inscripcione.dto';
import { UpdateInscripcioneDto } from './dto/update-inscripcione.dto';
import { Inscripciones } from './entities/inscripciones.entity';

@Injectable()
export class InscripcionesService {
  constructor(
    @InjectRepository(Inscripciones)
    private inscripcionesRepository: Repository<Inscripciones>,
  ) {}

  async create(
    createInscripcioneDto: CreateInscripcioneDto,
  ): Promise<Inscripciones> {
    try {
      const inscripcion = this.inscripcionesRepository.create(
        createInscripcioneDto,
      );
      return await this.inscripcionesRepository.save(inscripcion);
    } catch (error) {
      if (error.code === '23503') {
        // Foreign key constraint violation
        throw new ConflictException('Persona o Convocatoria no existe');
      }
      if (error.code === '23505') {
        // Unique constraint violation
        throw new ConflictException(
          'La persona ya está inscrita en esta convocatoria',
        );
      }
      throw error;
    }
  }

  async findAll(): Promise<Inscripciones[]> {
    return await this.inscripcionesRepository.find({
      relations: ['persona', 'convocatoria'],
    });
  }

  async findOne(id: number): Promise<Inscripciones> {
    const inscripcion = await this.inscripcionesRepository.findOne({
      where: { id_inscripcion: id },
      relations: ['persona', 'convocatoria'],
    });
    if (!inscripcion) {
      throw new NotFoundException(`Inscripción con ID ${id} no encontrada`);
    }
    return inscripcion;
  }

  async update(
    id: number,
    updateInscripcioneDto: UpdateInscripcioneDto,
  ): Promise<Inscripciones> {
    const inscripcion = await this.findOne(id);
    try {
      await this.inscripcionesRepository.update(
        { id_inscripcion: id },
        updateInscripcioneDto,
      );
      return { ...inscripcion, ...updateInscripcioneDto };
    } catch (error) {
      if (error.code === '23503') {
        throw new ConflictException('Persona o Convocatoria no existe');
      }
      throw error;
    }
  }

  async remove(id: number): Promise<void> {
    await this.findOne(id); // Verificar que existe
    await this.inscripcionesRepository.delete({ id_inscripcion: id });
  }

  async findByPersona(personaId: number): Promise<Inscripciones[]> {
    return await this.inscripcionesRepository.find({
      where: { persona_id: personaId },
      relations: ['convocatoria'],
    });
  }

  async findByConvocatoria(convocatoriaId: number): Promise<Inscripciones[]> {
    return await this.inscripcionesRepository.find({
      where: { convocatoria_id: convocatoriaId },
      relations: ['persona'],
    });
  }
}
