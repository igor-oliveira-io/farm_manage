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
import { HarvestsService } from './harvests.service';
import { CreateHarvestDto } from './dto/create-harvest.dto';
import { UpdateHarvestDto } from './dto/update-harvest.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import {
  CreateHarvestSchema,
  UpdateHarvestSchema,
} from './schemas/harvest.schema';
import { ZodValidationPipe } from 'src/pipes/zod-validation.pipe';

@ApiTags('Harvests')
@Controller('harvests')
export class HarvestsController {
  constructor(private readonly harvestsService: HarvestsService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(CreateHarvestSchema))
  @ApiOperation({ summary: 'Create a new harvest' })
  @ApiBody({
    description: 'Create Harvest',
    type: CreateHarvestDto,
    examples: {
      example1: {
        summary: 'Create Harvest Example',
        value: {
          farm_id: 1,
          year: '2025-01-01T00:00:00Z',
        },
      },
    },
  })
  create(@Body() createHarvestDto: CreateHarvestDto) {
    return this.harvestsService.create(createHarvestDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all harvests' })
  @ApiResponse({ status: 200, description: 'List of all harvests' })
  findAll() {
    return this.harvestsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a harvest by ID' })
  @ApiResponse({ status: 200, description: 'Harvest found' })
  @ApiResponse({ status: 404, description: 'Harvest not found' })
  findOne(@Param('id') id: number) {
    return this.harvestsService.findOne(+id);
  }

  @Patch(':id')
  @UsePipes(new ZodValidationPipe(UpdateHarvestSchema))
  @ApiOperation({ summary: 'Update a harvest' })
  @ApiBody({
    description: 'Update Harvest',
    type: UpdateHarvestDto,
    examples: {
      example1: {
        summary: 'Harvest Update Example',
        value: {
          farm_id: 1,
          year: '2025-01-01T00:00:00Z',
        },
      },
    },
  })
  @ApiResponse({ status: 200, description: 'Harvest updated successfully' })
  @ApiResponse({ status: 400, description: 'Invalid request body' })
  @ApiResponse({ status: 404, description: 'Harvest not found' })
  update(@Param('id') id: number, @Body() updateHarvestDto: UpdateHarvestDto) {
    return this.harvestsService.update(+id, updateHarvestDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a harvest' })
  @ApiResponse({ status: 200, description: 'Harvest deleted successfully' })
  @ApiResponse({ status: 404, description: 'Harvest not found' })
  remove(@Param('id') id: number) {
    return this.harvestsService.remove(+id);
  }
}
