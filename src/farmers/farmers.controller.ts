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
import { FarmersService } from './farmers.service';
import { ZodValidationPipe } from '../pipes/zod-validation.pipe';
import {
  CreateFarmerSchema,
  UpdateFarmerSchema,
} from './schemas/farmer.schema';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { CreateFarmerDto } from './dto/create-farmer.dto';
import { UpdateFarmerDto } from './dto/update-farmer.dto';

@ApiTags('Farmers')
@Controller('farmers')
export class FarmersController {
  constructor(private readonly farmersService: FarmersService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(CreateFarmerSchema))
  @ApiOperation({ summary: 'Create a new farmer' })
  @ApiBody({
    description: 'Create Farmer',
    type: CreateFarmerDto,
    examples: {
      example1: {
        summary: 'Create Farmer Example',
        value: {
          document: '12345678901',
          document_type: 'CPF',
          name: 'Farmer Name',
        },
      },
    },
  })
  create(@Body() createFarmerDto: CreateFarmerDto) {
    return this.farmersService.create(createFarmerDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all farmers' })
  @ApiResponse({ status: 200, description: 'List of all farmers' })
  findAll() {
    return this.farmersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a farmer by ID' })
  @ApiResponse({ status: 200, description: 'Farmer found' })
  @ApiResponse({ status: 404, description: 'Farmer not found' })
  findOne(@Param('id') id: string) {
    return this.farmersService.findOne(+id);
  }

  @Patch(':id')
  @UsePipes(new ZodValidationPipe(UpdateFarmerSchema))
  @ApiOperation({ summary: 'Update a farmer' })
  @ApiBody({
    description: 'Update Farmer',
    type: CreateFarmerDto,
    examples: {
      example1: {
        summary: 'Farmer Update Example',
        value: {
          document: '12345678901',
          document_type: 'CPF',
          name: 'Farmer Name',
        },
      },
    },
  })
  @ApiResponse({ status: 200, description: 'Farmer updated successfully' })
  @ApiResponse({ status: 400, description: 'Invalid request body' })
  @ApiResponse({ status: 404, description: 'Farmer not found' })
  update(@Param('id') id: string, @Body() updateFarmerDto: UpdateFarmerDto) {
    return this.farmersService.update(+id, updateFarmerDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a farmer' })
  @ApiResponse({ status: 200, description: 'Farmer deleted successfully' })
  @ApiResponse({ status: 404, description: 'Farmer not found' })
  remove(@Param('id') id: string) {
    return this.farmersService.remove(+id);
  }
}
