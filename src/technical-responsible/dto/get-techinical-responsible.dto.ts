export class GetTechnicalResponsibleDto {
  readonly id: number;
  readonly name: string;
  readonly crmv: string;

  constructor(partial: Partial<GetTechnicalResponsibleDto> = {}) {
    Object.assign(this, partial);
  }
}
