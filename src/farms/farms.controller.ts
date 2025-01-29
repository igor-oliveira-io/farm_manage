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
import { FarmsService } from './farms.service';
import { CreateFarmDto } from './dto/create-farm.dto';
import { UpdateFarmDto } from './dto/update-farm.dto';
import { ZodValidationPipe } from '../pipes/zod-validation.pipe';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { CreateFarmSchema, UpdateFarmSchema } from './schemas/farm.schema';

@ApiTags('Farms')
@Controller('farms')
export class FarmsController {
  constructor(private readonly farmsService: FarmsService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(CreateFarmSchema))
  @ApiOperation({ summary: 'Create a new farm' })
  @ApiBody({
    description: 'Create Farm',
    type: CreateFarmDto,
    examples: {
      example1: {
        summary: 'Create Farm Example',
        value: {
          farmer_id: 1,
          name: 'Farm 1',
          city: 'City Example',
          state: 'State Example',
          total_area: 500,
          arable_area: 400,
          vegetation_area: 100,
        },
      },
    },
  })
  create(@Body() createFarmDto: CreateFarmDto) {
    return this.farmsService.create(createFarmDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all farms' })
  @ApiResponse({ status: 200, description: 'List of all farms' })
  findAll() {
    return this.farmsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a farm by ID' })
  @ApiResponse({ status: 200, description: 'Farm found' })
  @ApiResponse({ status: 404, description: 'Farm not found' })
  findOne(@Param('id') id: string) {
    return this.farmsService.findOne(+id);
  }

  @Patch(':id')
  @UsePipes(new ZodValidationPipe(UpdateFarmSchema))
  @ApiOperation({ summary: 'Update a farm' })
  @ApiBody({
    description: 'Update Farm',
    type: UpdateFarmDto,
    examples: {
      example1: {
        summary: 'Farm Update Example',
        value: {
          farmer_id: 1,
          name: 'Farm Updated',
          city: 'City Example',
          state: 'State Example',
          total_area: 500,
          arable_area: 400,
          vegetation_area: 100,
        },
      },
    },
  })
  @ApiResponse({ status: 200, description: 'Farm updated successfully' })
  @ApiResponse({ status: 400, description: 'Invalid request body' })
  @ApiResponse({ status: 404, description: 'Farm not found' })
  update(@Param('id') id: string, @Body() updateFarmDto: UpdateFarmDto) {
    return this.farmsService.update(+id, updateFarmDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a farm' })
  @ApiResponse({ status: 200, description: 'Farm deleted successfully' })
  @ApiResponse({ status: 404, description: 'Farm not found' })
  remove(@Param('id') id: string) {
    return this.farmsService.remove(+id);
  }
}
