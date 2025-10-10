import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Persona } from '../../persona/entities/persona.entity';

@Entity()
export class Sexo {
  @PrimaryGeneratedColumn()
  id_sexo: number;

  @Column({ type: 'varchar', length: 50, nullable: false })
  sexo: string;

  @OneToMany(() => Persona, (persona) => persona.sexo)
  personas: Persona[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
