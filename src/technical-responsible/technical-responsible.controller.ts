import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Delete,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ConflictException } from '@nestjs/common';
import { TechnicalResponsibleService } from './technical-responsible.service';
import { CreateTechnicalResponsibleDto } from './dto/create-technical-responsible.dto';
import { GetTechnicalResponsibleDto } from './dto/get-techinical-responsible.dto';
import { UpdateTechnicalResponsibleDto } from './dto/update-technical-responsible.dto';

@ApiTags('Technical Responsible')
@Controller('technical-responsible')
export class TechnicalResponsibleController {
  constructor(private readonly service: TechnicalResponsibleService) {}

  @Post()
  @ApiOperation({
    summary: 'Create a new technical responsible',
    responses: {
      201: { description: 'Technical responsible created successfully' },
      409: { description: 'This crmv is already in use' },
    },
  })
  async create(
    @Body() technicalResponsibleData: CreateTechnicalResponsibleDto,
  ) {
    const technicalResponsibleWithSameCrmv = await this.service.findByCrmv(
      technicalResponsibleData.crmv,
    );
    if (!technicalResponsibleWithSameCrmv) {
      const createdTechnicalResponsible = await this.service.create(
        technicalResponsibleData,
      );
      const newTechnicalResponsible = new GetTechnicalResponsibleDto({
        id: createdTechnicalResponsible.id,
        name: createdTechnicalResponsible.name,
        crmv: createdTechnicalResponsible.crmv,
      });
      return newTechnicalResponsible;
    } else {
      throw new ConflictException('This crmv is already in use');
    }
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get technical responsible by id',
    responses: {
      200: { description: 'Technical responsible found successfully' },
      404: { description: 'Technical responsible not found' },
    },
  })
  async getById(@Param('id') id: number) {
    const technicalResponsible = await this.service.findById(id);
    if (!technicalResponsible) {
      throw new NotFoundException('Technical responsible not found');
    }
    return new GetTechnicalResponsibleDto({
      id: technicalResponsible.id,
      name: technicalResponsible.name,
      crmv: technicalResponsible.crmv,
    });
  }

  @Get()
  @ApiOperation({
    summary: 'List all technical responsibles',
    responses: {
      200: { description: 'List of technical responsibles found successfully' },
    },
  })
  async listAll() {
    const responsibles = await this.service.findAll();
    const responsiblesList = responsibles.map(
      (technicalResponsible) =>
        new GetTechnicalResponsibleDto({
          id: technicalResponsible.id,
          name: technicalResponsible.name,
          crmv: technicalResponsible.crmv,
        }),
    );
    return responsiblesList;
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update a technical responsible',
    responses: {
      200: { description: 'Technical responsible updated successfully' },
      404: { description: 'Technical responsible not found' },
      409: { description: 'This crmv is already in use' },
    },
  })
  async update(
    @Param('id') id: number,
    @Body() updateTechnicalResponsibleDto: UpdateTechnicalResponsibleDto,
  ) {
    const technicalResponsible = await this.service.findById(id);
    if (!technicalResponsible) {
      throw new ConflictException('Technical responsible not found');
    }

    if (updateTechnicalResponsibleDto.crmv) {
      const technicalResponsibleWithSameCrmv = await this.service.findByCrmv(
        updateTechnicalResponsibleDto.crmv,
      );
      if (technicalResponsibleWithSameCrmv) {
        throw new ConflictException('This crmv is already in use');
      }
    }

    await this.service.update(id, updateTechnicalResponsibleDto);
    return { message: 'Technical responsible updated successfully' };
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete a technical responsible',
    responses: {
      200: { description: 'Technical responsible deleted successfully' },
      404: { description: 'Technical responsible not found' },
    },
  })
  async delete(@Param('id') id: number) {
    const technicalResponsible = await this.service.findById(id);
    if (!technicalResponsible) {
      throw new NotFoundException('Technical responsible not found');
    }
    await this.service.delete(id);
    return { message: 'Technical responsible deleted successfully' };
  }
}
