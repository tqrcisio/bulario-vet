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
import { MedicineService } from './medicine.service';
import { CreateMedicineDto } from './dto/create-medicine.dto';
import { GetMedicineDto } from './dto/get-medicine.dto';
import { UpdateMedicineDto } from './dto/update-medicine.dto';
import { GetTechnicalResponsibleDto } from 'src/technical-responsible/dto/get-techinical-responsible.dto';

@ApiTags('Medicine')
@Controller('medicine')
export class MedicineController {
  constructor(private readonly service: MedicineService) {}

  @Post()
  @ApiOperation({
    summary: 'Create a new medicine',
    responses: {
      201: { description: 'Medicine created successfully' },
      409: { description: 'Technical responsible with this id does not exist' },
    },
  })
  async create(@Body() medicineData: CreateMedicineDto) {
    const createdMedicine = await this.service.create(medicineData);
    const newMedicine = new GetMedicineDto({
      id: createdMedicine.id,
      name: createdMedicine.name,
      description: createdMedicine.description,
      technical_responsible: new GetTechnicalResponsibleDto({
        id: createdMedicine.technical_responsible.id,
        name: createdMedicine.technical_responsible.name,
        crmv: createdMedicine.technical_responsible.crmv,
      }),
    });
    return newMedicine;
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get medicine by id',
    responses: {
      200: { description: 'Medicine found successfully' },
      404: { description: 'Medicine not found' },
    },
  })
  async getById(@Param('id') id: number) {
    const medicine = await this.service.findById(id);
    if (!medicine) {
      throw new NotFoundException('Medicine not found');
    }
    return new GetMedicineDto({
      id: medicine.id,
      name: medicine.name,
      description: medicine.description,
      technical_responsible: new GetTechnicalResponsibleDto({
        id: medicine.technical_responsible.id,
        name: medicine.technical_responsible.name,
        crmv: medicine.technical_responsible.crmv,
      }),
    });
  }

  @Get()
  @ApiOperation({
    summary: 'List all medicines',
    responses: {
      200: { description: 'List of medicines found successfully' },
    },
  })
  async listAll() {
    const medicines = await this.service.findAll();
    const medicinesList = medicines.map(
      (medicine) =>
        new GetMedicineDto({
          id: medicine.id,
          name: medicine.name,
          description: medicine.description,
          technical_responsible: new GetTechnicalResponsibleDto({
            id: medicine.technical_responsible.id,
            name: medicine.technical_responsible.name,
            crmv: medicine.technical_responsible.crmv,
          }),
        }),
    );
    return medicinesList;
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update a medicine',
    responses: {
      200: { description: 'Medicine updated successfully' },
      404: { description: 'Medicine not found' },
      // 409: { description: 'This map_code is already in use' },
    },
  })
  async update(
    @Param('id') id: number,
    @Body() updateMedicineDto: UpdateMedicineDto,
  ) {
    const medicine = await this.service.findById(id);
    if (!medicine) {
      throw new ConflictException('Medicine not found');
    }
    await this.service.update(id, updateMedicineDto);
    return { message: 'Medicine updated successfully' };
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete a medicine',
    responses: {
      200: { description: 'Medicine deleted successfully' },
      404: { description: 'Medicine not found' },
    },
  })
  async delete(@Param('id') id: number) {
    const medicine = await this.service.findById(id);
    if (!medicine) {
      throw new NotFoundException('Medicine not found');
    }
    await this.service.delete(id);
    return { message: 'Medicine deleted successfully' };
  }
}
