import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
} from '@nestjs/common';
import { PlantedCropsService } from './planted_crops.service';
import { CreatePlantedCropDto } from './dto/create-planted_crop.dto';
import { UpdatePlantedCropDto } from './dto/update-planted_crop.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import {
  CreatePlantedCropSchema,
  UpdatePlantedCropSchema,
} from './schemas/planted_crops.schema';
import { ZodValidationPipe } from '../pipes/zod-validation.pipe';

@ApiTags('Planted Crops')
@Controller('planted-crops')
export class PlantedCropsController {
  constructor(private readonly plantedCropsService: PlantedCropsService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(CreatePlantedCropSchema))
  @ApiOperation({ summary: 'Create a new planted crop' })
  @ApiBody({
    description: 'Create Planted Crop',
    type: CreatePlantedCropDto,
    examples: {
      example1: {
        summary: 'Create Planted Crop Example',
        value: {
          name: 'Rice',
          harvest_id: 1,
          production: 5000,
        },
      },
    },
  })
  create(@Body() createPlantedCropDto: CreatePlantedCropDto) {
    return this.plantedCropsService.create(createPlantedCropDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all planted crops' })
  @ApiResponse({ status: 200, description: 'List of all planted crops' })
  findAll() {
    return this.plantedCropsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a planted crop by ID' })
  @ApiResponse({ status: 200, description: 'Planted crop found' })
  @ApiResponse({ status: 404, description: 'Planted crop not found' })
  findOne(@Param('id') id: string) {
    return this.plantedCropsService.findOne(id);
  }

  @Patch(':id')
  @UsePipes(new ZodValidationPipe(UpdatePlantedCropSchema))
  @ApiOperation({ summary: 'Update a planted crop' })
  @ApiBody({
    description: 'Update Planted Crop',
    type: UpdatePlantedCropDto,
    examples: {
      example1: {
        summary: 'Update Planted Crop Example',
        value: {
          name: 'Rice',
          harvest_id: 1,
          production: 5000,
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Planted crop updated successfully',
  })
  @ApiResponse({ status: 400, description: 'Invalid request body' })
  @ApiResponse({ status: 404, description: 'Planted crop not found' })
  update(
    @Param('id') id: string,
    @Body() updatePlantedCropDto: UpdatePlantedCropDto,
  ) {
    return this.plantedCropsService.update(id, updatePlantedCropDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a planted crop' })
  @ApiResponse({
    status: 200,
    description: 'Planted crop deleted successfully',
  })
  @ApiResponse({ status: 404, description: 'Planted crop not found' })
  remove(@Param('id') id: string) {
    return this.plantedCropsService.remove(id);
  }
}
