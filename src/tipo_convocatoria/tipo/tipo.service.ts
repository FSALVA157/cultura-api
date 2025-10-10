import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTipoDto } from './dto/create-tipo.dto';
import { UpdateTipoDto } from './dto/update-tipo.dto';
import { Tipo } from './entities/tipo.entity';

@Injectable()
export class TipoService {
  constructor(
    @InjectRepository(Tipo)
    private tipoRepository: Repository<Tipo>,
  ) {}

  async create(createTipoDto: CreateTipoDto): Promise<Tipo> {
    try {
      const tipo = this.tipoRepository.create(createTipoDto);
      return await this.tipoRepository.save(tipo);
    } catch (error) {
      if (error.code === '23505') {
        // Unique constraint violation
        throw new ConflictException('El tipo ya existe');
      }
      throw error;
    }
  }

  async findAll(): Promise<Tipo[]> {
    return await this.tipoRepository.find();
  }

  async findOne(id: number): Promise<Tipo> {
    const tipo = await this.tipoRepository.findOne({
      where: { id_tipo: id },
    });
    if (!tipo) {
      throw new NotFoundException(`Tipo con ID ${id} no encontrado`);
    }
    return tipo;
  }

  async update(id: number, updateTipoDto: UpdateTipoDto): Promise<Tipo> {
    const tipo = await this.findOne(id);
    try {
      await this.tipoRepository.update({ id_tipo: id }, updateTipoDto);
      return { ...tipo, ...updateTipoDto };
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('El tipo ya existe');
      }
      throw error;
    }
  }

  async remove(id: number): Promise<void> {
    await this.findOne(id); // Verificar que existe
    await this.tipoRepository.delete({ id_tipo: id });
  }
}
