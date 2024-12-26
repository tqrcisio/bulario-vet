import { Module } from '@nestjs/common';
import { MedicineService } from './medicine.service';
import { MedicineController } from './medicine.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MedicineEntity } from '../../infra/database/entities/medicine.entity';
import { TechnicalResponsibleEntity } from '../../infra/database/entities/technical-responsible.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([MedicineEntity, TechnicalResponsibleEntity]),
  ],
  controllers: [MedicineController],
  providers: [MedicineService],
})
export class MedicineModule {}
