import { PartialType } from '@nestjs/swagger';
import { CreateTechnicalResponsibleDto } from './create-technical-responsible.dto';

export class UpdateTechnicalResponsibleDto extends PartialType(
  CreateTechnicalResponsibleDto,
) {}
