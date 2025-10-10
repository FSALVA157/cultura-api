import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Tipo {
  @PrimaryGeneratedColumn()
  id_tipo: number;

  @Column({ type: 'varchar', length: 150, nullable: false, unique: true })
  tipo_convocatoria: string;
}
