import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Tipo } from '../../tipo_convocatoria/tipo/entities/tipo.entity';

@Entity()
export class Convocatoria {
  @PrimaryGeneratedColumn()
  id_convocatoria: number;

  @Column({ type: 'varchar', length: 100, nullable: false })
  convocatoria: string;

  @Column({ type: 'int', nullable: true })
  tipo_id: number;

  @ManyToOne(() => Tipo)
  @JoinColumn({ name: 'tipo_id', referencedColumnName: 'id_tipo' })
  tipo: Tipo;

  @Column({ type: 'varchar', length: 200, nullable: true })
  descripcion: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  reglamento: string;

  @Column({ type: 'date', nullable: true })
  fecha: Date;

  @Column({ type: 'varchar', length: 200, nullable: true })
  ubicacion: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  referente: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  tel_referente: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
