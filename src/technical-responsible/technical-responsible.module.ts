import { Module } from '@nestjs/common';
import { TechnicalResponsibleService } from './technical-responsible.service';
import { TechnicalResponsibleController } from './technical-responsible.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TechnicalResponsibleEntity } from '../infra/database/entities/technical-responsible.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TechnicalResponsibleEntity])],
  controllers: [TechnicalResponsibleController],
  providers: [TechnicalResponsibleService],
})
export class TechnicalResponsibleModule {}
