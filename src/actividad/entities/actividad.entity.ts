import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Actividad {
  @PrimaryGeneratedColumn()
  id_actividad: number;

  @Column({ type: 'varchar', length: 100, nullable: false, unique: true })
  actividad: string;
}
