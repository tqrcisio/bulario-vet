import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TechnicalResponsibleEntity } from '../infra/database/entities/technical-responsible.entity';
import { Repository } from 'typeorm';
import { UpdateTechnicalResponsibleDto } from './dto/update-technical-responsible.dto';
import { CreateTechnicalResponsibleDto } from './dto/create-technical-responsible.dto';
import { GetTechnicalResponsibleDto } from './dto/get-techinical-responsible.dto';

@Injectable()
export class TechnicalResponsibleService {
  constructor(
    @InjectRepository(TechnicalResponsibleEntity)
    private readonly repository: Repository<TechnicalResponsibleEntity>,
  ) {}

  async create(data: CreateTechnicalResponsibleDto) {
    const technicalResponsibleEntity = new TechnicalResponsibleEntity();

    Object.assign(
      technicalResponsibleEntity,
      data as TechnicalResponsibleEntity,
    );

    return this.repository.save(technicalResponsibleEntity);
  }

  async findAll(): Promise<GetTechnicalResponsibleDto[]> {
    const savedTechnicalResponsibles = await this.repository.find({
      where: { deleted: false },
    });
    const formatedTechnicalResponsibles = savedTechnicalResponsibles.map(
      (technicalResponsible) =>
        new GetTechnicalResponsibleDto({
          id: technicalResponsible.id,
          name: technicalResponsible.name,
          crmv: technicalResponsible.crmv,
        }),
    );
    return formatedTechnicalResponsibles;
  }

  async findById(id: number): Promise<GetTechnicalResponsibleDto> {
    const technicalResponsible = await this.repository.findOneBy({ id });

    return new GetTechnicalResponsibleDto({
      id: technicalResponsible.id,
      name: technicalResponsible.name,
      crmv: technicalResponsible.crmv,
    });
  }

  async findByCrmv(crmv: string): Promise<TechnicalResponsibleEntity | null> {
    return this.repository.findOneBy({ crmv, deleted: false });
  }

  async update(id: number, newData: Partial<UpdateTechnicalResponsibleDto>) {
    await this.repository.update(id, newData);
  }

  async delete(id: number): Promise<void> {
    await this.repository.update(id, { deleted: true });
  }
}
