import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { TechnicalResponsibleEntity } from './technical-responsible.entity';

@Entity({ name: 'medicines' })
export class MedicineEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'name', length: 100, nullable: false })
  name: string;

  @Column({ name: 'description', length: 255, nullable: false })
  description: string;

  @ManyToOne(
    () => TechnicalResponsibleEntity,
    (technicalResponsible) => technicalResponsible.medicines,
    {
      cascade: false,
      nullable: false,
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn({ name: 'technical_responsible_id' })
  technical_responsible: TechnicalResponsibleEntity;

  @Column({ name: 'deleted', nullable: false, default: false })
  deleted: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: string;
}
