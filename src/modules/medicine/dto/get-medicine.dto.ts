import { GetTechnicalResponsibleDto } from '../../technical-responsible/dto/get-techinical-responsible.dto';

export class GetMedicineDto {
  readonly id: number;
  readonly name: string;
  readonly description: string;
  readonly technical_responsible: GetTechnicalResponsibleDto;

  constructor(partial: Partial<GetMedicineDto> = {}) {
    Object.assign(this, partial);
  }
}
