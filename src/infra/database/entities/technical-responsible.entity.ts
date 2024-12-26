import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';
import { MedicineEntity } from './medicine.entity';

//TODO: Verificar se será criado campos de endereço e contato nessa entidade
@Entity({ name: 'technical_responsibles' })
export class TechnicalResponsibleEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'name', length: 100, nullable: false })
  name: string;

  @Column({ name: 'crmv', length: 100, nullable: false })
  crmv: string;

  @OneToMany(() => MedicineEntity, (medicine) => medicine.technical_responsible)
  medicines: MedicineEntity[];

  @Column({ name: 'deleted', nullable: false, default: false })
  deleted: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: string;
}
