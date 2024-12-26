import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MedicineEntity } from '../infra/database/entities/medicine.entity';
import { Repository } from 'typeorm';
import { CreateMedicineDto } from './dto/create-medicine.dto';
import { UpdateMedicineDto } from './dto/update-medicine.dto';
import { TechnicalResponsibleEntity } from '../infra/database/entities/technical-responsible.entity';

@Injectable()
export class MedicineService {
  constructor(
    @InjectRepository(MedicineEntity)
    private readonly medicineRepository: Repository<MedicineEntity>,
    @InjectRepository(TechnicalResponsibleEntity)
    private readonly technicalResponsibleRepository: Repository<TechnicalResponsibleEntity>,
  ) {}

  async create(data: CreateMedicineDto) {
    const technicalResponsible =
      await this.technicalResponsibleRepository.findOneBy({
        id: data.technical_responsible_id,
      });

    if (!technicalResponsible) {
      throw new NotFoundException(
        'Technical responsible with this id does not exist.',
      );
    }

    const medicineEntity = this.medicineRepository.create({
      name: data.name,
      description: data.description,
      technical_responsible: technicalResponsible,
    });

    return this.medicineRepository.save(medicineEntity);
  }

  async findAll() {
    return await this.medicineRepository.find({
      relations: ['technical_responsible'],
      where: { deleted: false },
    });
  }

  async findById(id: number) {
    return await this.medicineRepository.findOneBy({ id });
  }

  async update(id: number, newData: Partial<UpdateMedicineDto>) {
    await this.medicineRepository.update(id, newData);
  }

  async delete(id: number) {
    await this.medicineRepository.update(id, { deleted: true });
  }
}
