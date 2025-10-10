import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateConvocatoriaDto } from './dto/create-convocatoria.dto';
import { UpdateConvocatoriaDto } from './dto/update-convocatoria.dto';
import { Convocatoria } from './entities/convocatoria.entity';

@Injectable()
export class ConvocatoriaService {
  constructor(
    @InjectRepository(Convocatoria)
    private readonly convocatoriaRepository: Repository<Convocatoria>,
  ) {}

  async create(
    createConvocatoriaDto: CreateConvocatoriaDto,
  ): Promise<Convocatoria> {
    try {
      const convocatoria = this.convocatoriaRepository.create(
        createConvocatoriaDto,
      );
      return await this.convocatoriaRepository.save(convocatoria);
    } catch (error) {
      throw new BadRequestException('Error al crear la convocatoria', error);
    }
  }

  async findAll(): Promise<Convocatoria[]> {
    return await this.convocatoriaRepository.find({
      relations: ['tipo'],
      order: {
        fecha: 'DESC',
        created_at: 'DESC',
      },
    });
  }

  async findOne(id: number): Promise<Convocatoria> {
    const convocatoria = await this.convocatoriaRepository.findOne({
      where: { id_convocatoria: id },
    });

    if (!convocatoria) {
      throw new NotFoundException(`Convocatoria con ID ${id} no encontrada`);
    }

    return convocatoria;
  }

  async findByTipo(tipoId: number): Promise<Convocatoria[]> {
    return await this.convocatoriaRepository.find({
      where: { tipo_id: tipoId },
      order: {
        fecha: 'DESC',
        created_at: 'DESC',
      },
    });
  }

  async findByFecha(fecha: string): Promise<Convocatoria[]> {
    return await this.convocatoriaRepository.find({
      where: { fecha: new Date(fecha) },
      order: {
        created_at: 'DESC',
      },
    });
  }

  async findByNombre(nombre: string): Promise<Convocatoria[]> {
    return await this.convocatoriaRepository
      .createQueryBuilder('convocatoria')
      .where('convocatoria.convocatoria ILIKE :nombre', {
        nombre: `%${nombre}%`,
      })
      .orderBy('convocatoria.fecha', 'DESC')
      .addOrderBy('convocatoria.created_at', 'DESC')
      .getMany();
  }

  async update(
    id: number,
    updateConvocatoriaDto: UpdateConvocatoriaDto,
  ): Promise<Convocatoria> {
    const convocatoria = await this.findOne(id);

    try {
      Object.assign(convocatoria, updateConvocatoriaDto);
      return await this.convocatoriaRepository.save(convocatoria);
    } catch (error) {
      throw new BadRequestException(
        'Error al actualizar la convocatoria',
        error,
      );
    }
  }

  async remove(id: number): Promise<{ message: string }> {
    const convocatoria = await this.findOne(id);
    await this.convocatoriaRepository.remove(convocatoria);
    return { message: `Convocatoria con ID ${id} eliminada correctamente` };
  }
}
