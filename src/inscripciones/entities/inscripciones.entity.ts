import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Persona } from '../../persona/entities/persona.entity';
import { Convocatoria } from '../../convocatoria/entities/convocatoria.entity';

export enum EstadoInscripcion {
  ACTIVO = 'activo',
  PENDIENTE = 'pendiente',
  INACTIVO = 'inactivo',
}

@Entity()
export class Inscripciones {
  @PrimaryGeneratedColumn()
  id_inscripcion: number;

  @Column({ type: 'int', nullable: false })
  persona_id: number;

  @ManyToOne(() => Persona)
  @JoinColumn({ name: 'persona_id', referencedColumnName: 'id_persona' })
  persona: Persona;

  @Column({ type: 'int', nullable: false })
  convocatoria_id: number;

  @ManyToOne(() => Convocatoria)
  @JoinColumn({
    name: 'convocatoria_id',
    referencedColumnName: 'id_convocatoria',
  })
  convocatoria: Convocatoria;

  @Column({
    type: 'enum',
    enum: EstadoInscripcion,
    default: EstadoInscripcion.ACTIVO,
    nullable: false,
  })
  estado: EstadoInscripcion;

  @CreateDateColumn()
  fecha_inscripcion: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
