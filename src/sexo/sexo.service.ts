import {
  Injectable,
  NotFoundException,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSexoDto } from './dto/create-sexo.dto';
import { UpdateSexoDto } from './dto/update-sexo.dto';
import { Sexo } from './entities/sexo.entity';

@Injectable()
export class SexoService {
  constructor(
    @InjectRepository(Sexo)
    private readonly sexoRepository: Repository<Sexo>,
  ) {}

  async create(createSexoDto: CreateSexoDto): Promise<Sexo> {
    try {
      const sexo = this.sexoRepository.create(createSexoDto);
      return await this.sexoRepository.save(sexo);
    } catch (error) {
      // Manejar errores de duplicados si se agrega constraint unique
      if (error.code === '23505') {
        throw new ConflictException('Ya existe un sexo con este nombre');
      }
      throw new BadRequestException('Error al crear el sexo');
    }
  }

  async findAll(): Promise<Sexo[]> {
    return await this.sexoRepository.find({
      order: {
        created_at: 'ASC',
      },
    });
  }

  async findOne(id: number): Promise<Sexo> {
    const sexo = await this.sexoRepository.findOne({
      where: { id_sexo: id },
    });

    if (!sexo) {
      throw new NotFoundException(`Sexo con ID ${id} no encontrado`);
    }

    return sexo;
  }

  async findBySexo(sexoNombre: string): Promise<Sexo | null> {
    return await this.sexoRepository.findOne({
      where: { sexo: sexoNombre },
    });
  }

  async update(id: number, updateSexoDto: UpdateSexoDto): Promise<Sexo> {
    const sexo = await this.findOne(id);

    try {
      Object.assign(sexo, updateSexoDto);
      return await this.sexoRepository.save(sexo);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Ya existe un sexo con este nombre');
      }
      throw new BadRequestException('Error al actualizar el sexo');
    }
  }

  async remove(id: number): Promise<{ message: string }> {
    const sexo = await this.findOne(id);
    await this.sexoRepository.remove(sexo);
    return { message: `Sexo con ID ${id} eliminado correctamente` };
  }
}
