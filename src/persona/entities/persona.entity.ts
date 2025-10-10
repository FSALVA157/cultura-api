import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Sexo } from '../../sexo/entities/sexo.entity';
import { Actividad } from 'src/actividad/entities/actividad.entity';

export enum TipoPersona {
  HUMANA = 'humana',
  JURIDICA = 'juridica',
}

@Entity()
export class Persona {
  @PrimaryGeneratedColumn()
  id_persona: number;

  @Column({ type: 'varchar', length: 255, unique: true, nullable: false })
  email: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  nombre: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  apellido: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  password: string;

  @Column({ type: 'int', unique: true, nullable: false })
  dni: number;

  @Column({ type: 'varchar', length: 15, nullable: true })
  cuil_cuit: string;

  @Column({ type: 'int', nullable: true })
  rol_id: number;

  @Column({ type: 'boolean', default: false })
  es_admin: boolean;

  @Column({ type: 'int', nullable: true })
  area_id: number;

  @Column({ type: 'int', nullable: true })
  sexo_id: number;

  @ManyToOne(() => Sexo, (sexo) => sexo.personas)
  @JoinColumn({ name: 'sexo_id' })
  sexo: Sexo;

  @Column({ type: 'date', nullable: true })
  fecha_nacimiento: Date;

  @Column({ type: 'text', nullable: true })
  direccion: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  localidad: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  provincia: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  telefono: string;

  @Column({ type: 'int', nullable: true })
  localidad_id: number;

  @Column({
    type: 'enum',
    enum: TipoPersona,
    nullable: false,
    default: TipoPersona.HUMANA,
  })
  tipo_persona: TipoPersona;

  @Column({ type: 'varchar', length: 255, nullable: true })
  nombre_razon_social: string;

  @Column({ type: 'int', nullable: false })
  actividad_id: number;

  @ManyToOne(() => Actividad)
  @JoinColumn({ name: 'actividad_id' })
  actividad: Actividad;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
